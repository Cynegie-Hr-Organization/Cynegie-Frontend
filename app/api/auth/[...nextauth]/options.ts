/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { AuthOptions } from 'next-auth';
import { User as NextAuthUser } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authUrl } from '@/constants/config';
import { rolesMap } from '../../../../types/form';
import { request } from '@/utils/request';

const credentialsProviderOptions = {
  name: 'Login',
  credentials: {
    email: { label: 'Email Address', type: 'email', placeholder: 'john@gmail.com' },
    password: { label: 'Password', type: 'password', placeholder: 'Your secure password' }
  },
authorize: async (credentials: any) => {
  const { email, password } = credentials || {};
  if (!email || !password) return null;

  try {
    const json = await request('POST', `${authUrl}`, { data: { email, password } });

    // Log the response for debugging
    console.log('Login response:', json);

    if (!json || json.error || !json.data || !json.data.data) {
      console.error('Invalid credentials or server error:', json?.error || 'No response data');
      throw new Error('Invalid credentials or server error');
    }

    const { accessToken, refreshToken, user } = json.data.data;

    if (!user || !user.id) {
      console.error('User data is missing or incomplete:', user);
      return null;
    }

    const loggedInUser: NextAuthUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      company: user.company,
      token: { accessToken, refreshToken }
    };

    return loggedInUser;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

};

export const authOptions: AuthOptions = {
  providers: [CredentialsProvider(credentialsProviderOptions)],
  callbacks: {
    async jwt({ token, user }) {
  if (user) {
    token.name = user.email || '';
    token.access = user.token.accessToken || '';
    token.refresh = user.token.refreshToken || '';
    token.role = user.role || '';
    token.firstName = user.firstName || '';
    token.lastName = user.lastName || '';
    token.company = user.company || '';
  }
  return token;
},
   async session({ session, token }) {
  session.user = {
    email: token.name as string,
    role: token.role as string,
    firstName: token.firstName as string,
    lastName: token.lastName as string,
    company: token.company as string
  };
  session.token = token.access as string; // Explicitly cast token.access to a string
  return session;
},

   async signIn({ user }) {
  if (!user.role) {
    console.error('User role is missing during sign-in');
    return false;
  }

  return rolesMap[user.role] ? true : false;
}

  },
  pages: {
    signIn: '/signin'
  }
};

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
