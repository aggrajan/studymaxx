export const getReviews = async (id: string) => {
  try {
    const response = await fetch(`/api/get-reviews/${id}`);
    if (!response.ok) return [];

    const data = await response.json();
    if (data.success) {
      return data.response;
    }
    return data.message;
  } catch (error) {
    return [];
  }
};
