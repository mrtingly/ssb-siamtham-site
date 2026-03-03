export async function submitOrder(endpointUrl, payload){
  const res = await fetch(endpointUrl, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });

  const data = await res.json().catch(()=> ({}));
  if(!res.ok) throw new Error(data.message || "Submit failed");
  return data;
}
