export const getEveryQuery = async () => {
  try {
    const res = await fetch('/api/all-queries', {
      method: 'GET',
      cache: 'no-store', // or use next: { revalidate: 60 } if caching is needed
    });
    const data = await res.json();
    if (data.success) return data.response;
    return [];
  } catch (error) {
    return [];
  }
};
