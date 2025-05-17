export const getQuery = async () => {
  try {
    const response = await fetch('/api/query');
    if (!response.ok) return [];

    const data = await response.json();
    if (data.success) return data.response;
    return [];
  } catch (error) {
    return [];
  }
};
