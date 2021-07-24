export const post = async (url, body) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml',
    },
    body: b,
  });
  
  const data = await res.text();

  const parser = new DOMParser();
  const xml = parser.parseFromString(data, 'text/xml');

  return { status: res.status, response: xml };
}