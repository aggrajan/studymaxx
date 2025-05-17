export const logout = async () => {
  try {
    await fetch('/api/logout', {
      method: 'POST',
    });
  } catch (error) {
    console.log('logout failed');
  }
};
