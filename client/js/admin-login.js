import { loginAdmin } from './auth.js';

const adminBaseUrl = window.location.origin.includes('5500')
  ? 'http://localhost:5000'
  : window.location.origin;

const initAdminLoginPage = () => {
  const form = document.getElementById('admin-login-form');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const feedback = document.getElementById('admin-login-feedback');
    const submitButton = form.querySelector('button[type="submit"]');
    const payload = Object.fromEntries(new FormData(form).entries());

    if (feedback) {
      feedback.textContent = 'Authenticating...';
    }

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      await loginAdmin(payload);
      window.location.replace(`${adminBaseUrl}/admin`);
    } catch (error) {
      if (feedback) {
        feedback.textContent = error.message || 'Unable to log in right now.';
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdminLoginPage);
} else {
  initAdminLoginPage();
}
