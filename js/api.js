export const ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbzKUf38mPTywUqOLXHqDPIeBH7_VV2w42CbLc5rg72dufSKAUd2XDkFhA4tXtjy_LMrFQ/exec"; {
  const fd = new FormData();
  fd.append("payload", JSON.stringify(payload)); // ส่งเป็นฟิลด์เดียว

  const res = await fetch(endpointUrl, {
    method: "POST",
    body: fd,
  });

  const text = await res.text();
  let data = {};
  try { data = JSON.parse(text); } catch {}

  if (!res.ok) {
    throw new Error((data && data.message) ? data.message : `HTTP ${res.status}: ${text.slice(0,120)}`);
  }
  return data;
}
