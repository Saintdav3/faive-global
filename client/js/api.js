import { tokenStore } from '../services/storage.js';

const API_BASE_URL = window.location.origin.includes('5500')
  ? 'http://localhost:5000/api'
  : `${window.location.origin}/api`;

const request = async (endpoint, options = {}) => {
  const headers = new Headers(options.headers || {});
  const token = tokenStore.get();

  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include'
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    throw new Error(payload?.message || 'Request failed');
  }

  return payload;
};

export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, body, options = {}) =>
    request(endpoint, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...options
    }),
  put: (endpoint, body, options = {}) =>
    request(endpoint, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...options
    }),
  delete: (endpoint) =>
    request(endpoint, {
      method: 'DELETE'
    })
};

export const apiEndpoints = {
  services: '/services',
  portfolio: '/portfolio',
  quotes: '/quotes',
  contacts: '/contact',
  authLogin: '/auth/login',
  authLogout: '/auth/logout',
  authMe: '/auth/me'
};
