export type Role = 'student' | 'admin';

export type User = {
  id: string;
  name: string;
  role: Role;
};

export type AuthContext = {
  currentUser: User | null;
};
