export async function submitOrder(endpointUrl, payload) {
  const fd = new FormData();
  fd.append("payload", JSON.stringify(payload));

  const res = await fetch(endpointUrl, {
    method: "POST",
    body: fd
  });

  const text = await res.text();
  let data = {};
  try {
    data = JSON.parse(text);
  } catch {
    data = { ok: false, message: text };
  }

  return data;
}
