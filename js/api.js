export const ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbzKUf38mPTywUqOLXHqDPIeBH7_VV2w42CbLc5rg72dufSKAUd2XDkFhA4tXtjy_LMrFQ/exec";

export async function submitOrder(payload) {
  const fd = new FormData();
  fd.append("payload", JSON.stringify(payload));

  const res = await fetch(ENDPOINT_URL, {
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
