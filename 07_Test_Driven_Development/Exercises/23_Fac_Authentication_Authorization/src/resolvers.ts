import { GraphQLError } from 'graphql';
import { issueTokenForRole, requireAuth, requireRole } from './auth.js';
import type { AuthContext, Role } from './types.js';

type LoginArgs = {
  role: Role;
};

export const resolvers = {
  Query: {
    me: (_parent: unknown, _args: unknown, context: AuthContext) => {
      return requireAuth(context.currentUser);
    },
    adminDashboard: (_parent: unknown, _args: unknown, context: AuthContext) => {
      requireRole(context.currentUser, 'admin');
      return 'Admin-only analytics: active users 128';
    },
  },
  Mutation: {
    login: (_parent: unknown, args: LoginArgs) => {
      if (args.role !== 'student' && args.role !== 'admin') {
        throw new GraphQLError('Invalid role for login', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const token = issueTokenForRole(args.role);
      const user = args.role === 'admin'
        ? { id: 'user-admin-1', name: 'Admin Tester', role: 'admin' }
        : { id: 'user-student-1', name: 'Student Tester', role: 'student' };

      return { token, user };
    },
  },
};
