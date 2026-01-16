export interface User {
  id?: number;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  role?: string;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
