export default async function getQRbyCode(code: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/qr/code/${code}`, {
      method: 'GET',
    });

    const data = await res.json();
    return data.response || [];
  } catch (error) {
    return [];
  }
}
