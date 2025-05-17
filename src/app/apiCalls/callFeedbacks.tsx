export const getFeedbacks = async () => {
  try {
    const res = await fetch('/api/feedback', {
      method: 'GET',
      cache: 'no-store', // or use next: { revalidate: 60 } if you want caching
    });
    const data = await res.json();
    if (data.success) return data.response;
    return [];
  } catch (error) {
    return [];
  }
};
