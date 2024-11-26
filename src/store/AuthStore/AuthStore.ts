import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { authService } from '@services/authService';
import { LoginData, RegisterData, UpdateUserData, User } from '@types/user';
import { Meta } from '../types';

type PrivateFields = '_user' | '_meta' | '_errorMessage' | '_isAuthenticated' | '_token';

class AuthStore {
  private _user: User | null = null;
  private _meta: Meta = Meta.initial;
  private _errorMessage: string = '';
  private _isAuthenticated: boolean = false;
  private _token: string | null = null;

  constructor() {
    makeObservable<AuthStore, PrivateFields>(this, {
      _user: observable,
      _meta: observable,
      _errorMessage: observable,
      _isAuthenticated: observable,
      _token: observable,

      user: computed,
      meta: computed,
      errorMessage: computed,
      isAuthenticated: computed,


      login: action,
      register: action,
      logout: action,
      checkAuth: action,
      setToken: action,
      setError: action
    });

    // Проверяем токен при инициализации
    const token = localStorage.getItem('token');
    if (token) {
      this._token = token;
      this.checkAuth();
    }
  }

  get user() { return this._user; }
  get meta() { return this._meta; }
  get errorMessage() { return this._errorMessage; }
  get isAuthenticated() { return this._isAuthenticated; }

  setToken(token: string | null) {
    this._token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  async login(data: LoginData) {
    this._meta = Meta.loading;
    try {
      const response = await authService.login(data);
      runInAction(() => {
        this._user = response.data;
        this.setToken(response.token);
        this._isAuthenticated = true;
        this._meta = Meta.success;
      });
    } catch (error: any) {
      runInAction(() => {
        this._meta = Meta.error;
        this._errorMessage = error.response?.data?.message || 'Ошибка входа';
        this._isAuthenticated = false;
        this.setToken(null);
      });
    }
  }

  async register(data: RegisterData) {
    this._meta = Meta.loading;
    try {
      const response = await authService.register(data);
      runInAction(() => {
        this._user = response.data;
        this.setToken(response.token);
        this._isAuthenticated = true;
        this._meta = Meta.success;
      });
    } catch (error: any) {
      runInAction(() => {
        this._meta = Meta.error;
        this._errorMessage = error.response?.data?.message || 'Ошибка регистрации';
        this._isAuthenticated = false;
        this.setToken(null);
      });
    }
  }

  async checkAuth() {
    try {
      const user = await authService.getCurrentUser();
      runInAction(() => {
        this._user = user;
        this._isAuthenticated = true;
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.logout();
      }
    }
  }
  async updateUser(userData: UpdateUserData) {
    if (!this.user?.id) {
      this._meta = Meta.error;
      this._errorMessage = 'Пользователь не найден';
      return;
    }

    try {
      this._meta = Meta.loading;
      const updatedUser = await authService.updateUser(this.user.id, userData);
      this._user = updatedUser;
      this._meta = Meta.success;
    } catch (error) {
      this._meta = Meta.error;
      this._errorMessage = error instanceof Error ? error.message : 'Ошибка при обновлении профиля';
    }
  }

  logout() {
    this._user = null;
    this._isAuthenticated = false;
    this.setToken(null);
  }

 
  setError(message: string) {
    this._meta = Meta.error;
    this._errorMessage = message;
  }
}

export default AuthStore; 