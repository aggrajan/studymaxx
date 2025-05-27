export default async function getEveryQR() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/qr`, {
      method: 'GET',
    });

    const data = await res.json();
    return data.response || [];
  } catch (error) {
    return [];
  }
}
