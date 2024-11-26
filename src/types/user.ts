export interface User {
  id: number;
  email: string;
  username: string;
  avatar?: string;
}
export interface UpdateUserData {
 id: number
  username: string;
  email: string;
  avatar?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  username: string;
} 