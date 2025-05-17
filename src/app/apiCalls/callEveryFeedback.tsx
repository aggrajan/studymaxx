export const getEveryFeedback = async () => {
  try {
    const res = await fetch('/api/all-feedbacks', {
      method: 'GET',
      cache: 'no-store', // ensures it always fetches the latest feedbacks
    });

    const data = await res.json();
    if (data.success) return data.response;
    return [];
  } catch (error) {
    return [];
  }
};
