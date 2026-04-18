export const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('medisync_token') : null;

export const getUser = () => {
  if (typeof window === 'undefined') return null;
  const u = localStorage.getItem('medisync_user');
  return u ? JSON.parse(u) : null;
};

export const isAuthenticated = () => !!getToken();

export const clearAuth = () => {
  localStorage.removeItem('medisync_token');
  localStorage.removeItem('medisync_user');
};
