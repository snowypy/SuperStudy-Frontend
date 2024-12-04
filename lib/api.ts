const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v2';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

export const login = async (usernameOrEmail: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/account/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({ usernameOrEmail, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
};

export const register = async (username: string, email: string, password: string, invitecode: string) => {
  const response = await fetch(`${API_BASE_URL}/account/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({ username, email, password, invitecode }),
  });

  if (!response.ok) {
    throw new Error('Failed to register');
  }

  return response.json();
};

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${API_BASE_URL}/account/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return response.json();
};