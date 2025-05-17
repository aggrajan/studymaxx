export default async function getCoupons() {
  try {
    const res = await fetch('/api/coupon', {
      method: 'GET',
      next: { revalidate: 60 } // Caches the result for 60 seconds
    });

    const data = await res.json();
    return data.response || [];
  } catch (error) {
    return [];
  }
}
