export const getReviews = async (id: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-reviews/${id}`);
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
