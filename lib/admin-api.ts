const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v2';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

export const getUsers = async (adminId: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({ adminId, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
};

export const getUserIdByEmail = async (email: string) => {
  const response = await fetch(`${API_BASE_URL}/account/user-id`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user ID');
  }

  return response.json();
};

export const createInvite = async (adminId: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/create-invite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({ adminId }),
  });

  if (!response.ok) {
    throw new Error('Failed to create invite code');
  }

  return response.json();
};