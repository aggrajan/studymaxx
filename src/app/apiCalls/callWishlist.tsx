export const getWishlist = async (userId: string) => {
  try {
    const response = await fetch(`/api/get-wishlist/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    console.log(data.response, "data.response");
    return data.response;
  } catch (error) {
    return null;
  }
};
