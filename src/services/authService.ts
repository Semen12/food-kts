import { AuthResponse, RegisterResponse, UpdateUserResponse } from '@types/auth';
import { api, BASE_URL } from '@config/axios';
import { LoginData, RegisterData, UpdateUserData, User } from '@types/user';

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async register(data: RegisterData): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/auth_me');
    return response.data;
  },

  async updateUser(userId: number, userData: UpdateUserData): Promise<User> {
    if (!userId) {
      throw new Error('ID пользователя не определен');
    }

    const response = await api.patch<User>(`${BASE_URL}/users/${userId}`, userData);

    if (!response.data) {
      throw new Error('Ошибка при обновлении профиля');
    }

    return response.data;
  },

  logout(): void {
    localStorage.removeItem('token');
  }
}; 