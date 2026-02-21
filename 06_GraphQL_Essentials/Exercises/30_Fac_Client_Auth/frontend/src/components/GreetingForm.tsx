import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN_MUTATION, ME_QUERY, REGISTER_MUTATION } from '../graphql/queries';

interface User {
  id: string;
  username: string;
  email: string;
}

interface MeData {
  me: User | null;
}

interface AuthPayload {
  token: string;
  user: User;
}

interface RegisterData {
  register: AuthPayload;
}

interface LoginData {
  login: AuthPayload;
}

interface RegisterVars {
  username: string;
  email: string;
  password: string;
}

interface LoginVars {
  email: string;
  password: string;
}

function GreetingForm() {
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [statusMessage, setStatusMessage] = useState('');

  // `me` query validates that client auth headers + server context are working.
  const { data: meData, loading: meLoading, error: meError, refetch } = useQuery<MeData>(ME_QUERY, {
    fetchPolicy: 'network-only',
  });

  const [register, { loading: registering, error: registerError }] = useMutation<RegisterData, RegisterVars>(
    REGISTER_MUTATION
  );

  const [login, { loading: loggingIn, error: loginError }] = useMutation<LoginData, LoginVars>(
    LOGIN_MUTATION
  );

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!registerForm.username.trim() || !registerForm.email.trim() || !registerForm.password.trim()) {
      return;
    }

    const result = await register({
      variables: {
        username: registerForm.username.trim(),
        email: registerForm.email.trim(),
        password: registerForm.password,
      },
    });

    const token = result.data?.register.token;
    if (token) {
      // Persist token so authLink can include it in future GraphQL requests.
      localStorage.setItem('authToken', token);
      setStatusMessage('✅ Registered and authenticated');
      await refetch();
    }

    setRegisterForm({ username: '', email: '', password: '' });
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      return;
    }

    const result = await login({
      variables: {
        email: loginForm.email.trim(),
        password: loginForm.password,
      },
    });

    const token = result.data?.login.token;
    if (token) {
      localStorage.setItem('authToken', token);
      setStatusMessage('✅ Logged in and authenticated');
      await refetch();
    }

    setLoginForm({ email: '', password: '' });
  };

  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    setStatusMessage('👋 Logged out');
    await refetch();
  };

  return (
    <section className="card">
      <h2>Apollo Client Authentication</h2>

      <form onSubmit={handleRegister}>
        <h3>Register</h3>
        <label htmlFor="register-username">Username</label>
        <input
          id="register-username"
          value={registerForm.username}
          onChange={(event) => setRegisterForm((prev) => ({ ...prev, username: event.target.value }))}
          placeholder="Enter username"
          disabled={registering}
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          value={registerForm.email}
          onChange={(event) => setRegisterForm((prev) => ({ ...prev, email: event.target.value }))}
          placeholder="Enter email"
          disabled={registering}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          value={registerForm.password}
          onChange={(event) => setRegisterForm((prev) => ({ ...prev, password: event.target.value }))}
          placeholder="Enter password"
          disabled={registering}
        />

        <button type="submit" disabled={registering}>
          {registering ? 'Registering...' : 'Register'}
        </button>
      </form>

      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={loginForm.email}
          onChange={(event) => setLoginForm((prev) => ({ ...prev, email: event.target.value }))}
          placeholder="Enter email"
          disabled={loggingIn}
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={loginForm.password}
          onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
          placeholder="Enter password"
          disabled={loggingIn}
        />

        <button type="submit" disabled={loggingIn}>
          {loggingIn ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <button type="button" onClick={handleLogout}>Logout</button>

      {registerError && <p>Register error: {registerError.message}</p>}
      {loginError && <p>Login error: {loginError.message}</p>}
      {meError && <p>Me query error: {meError.message}</p>}
      {statusMessage && <p>{statusMessage}</p>}

      {meLoading && <p>Loading current user...</p>}

      <div className="result-box">
        <p><strong>Current user from `me` query:</strong></p>
        {meData?.me ? (
          <p>{meData.me.username} ({meData.me.email})</p>
        ) : (
          <p>Not authenticated yet.</p>
        )}
      </div>
    </section>
  );
}

export default GreetingForm;
