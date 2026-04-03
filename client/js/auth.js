import { api, apiEndpoints } from './api.js';
import { tokenStore, userStore } from '../services/storage.js';

const adminBaseUrl = window.location.origin.includes('5500')
  ? 'http://localhost:5000'
  : window.location.origin;

export const loginAdmin = async (credentials) => {
  tokenStore.clear();
  userStore.clear();

  const response = await api.post(apiEndpoints.authLogin, credentials);
  tokenStore.set(response.data.token);
  userStore.set(response.data.user);
  return response.data;
};

export const getCurrentAdmin = async () => {
  const response = await api.get(apiEndpoints.authMe);
  userStore.set(response.data);
  return response.data;
};

export const logoutAdmin = () => {
  api.post(apiEndpoints.authLogout, {}).catch(() => null);
  tokenStore.clear();
  userStore.clear();
  window.location.href = `${adminBaseUrl}/admin/login`;
};

export const requireAdminSession = async () => {
  try {
    const admin = await getCurrentAdmin();
    return admin;
  } catch (error) {
    const hasLocalSession = Boolean(tokenStore.get());

    if (!hasLocalSession) {
      window.location.href = `${adminBaseUrl}/admin/login`;
      return null;
    }

    logoutAdmin();
    return null;
  }
};
