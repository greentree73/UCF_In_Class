import { GraphQLError } from 'graphql';
import type { Role, User } from './types.js';

const usersByRole: Record<Role, User> = {
  student: {
    id: 'user-student-1',
    name: 'Student Tester',
    role: 'student',
  },
  admin: {
    id: 'user-admin-1',
    name: 'Admin Tester',
    role: 'admin',
  },
};

const tokenByRole: Record<Role, string> = {
  student: 'student-token',
  admin: 'admin-token',
};

const userByToken: Record<string, User> = {
  [tokenByRole.student]: usersByRole.student,
  [tokenByRole.admin]: usersByRole.admin,
};

export const issueTokenForRole = (role: Role) => {
  return tokenByRole[role];
};

export const getUserFromAuthorizationHeader = (authorization?: string): User | null => {
  if (!authorization) {
    return null;
  }

  const [scheme, token] = authorization.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return null;
  }

  return userByToken[token] ?? null;
};

export const requireAuth = (currentUser: User | null): User => {
  if (!currentUser) {
    throw new GraphQLError('Authentication required', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }

  return currentUser;
};

export const requireRole = (currentUser: User | null, requiredRole: Role): User => {
  const authenticatedUser = requireAuth(currentUser);

  if (authenticatedUser.role !== requiredRole) {
    throw new GraphQLError('Insufficient permissions', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }

  return authenticatedUser;
};
