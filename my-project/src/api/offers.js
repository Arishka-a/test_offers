const token = () => localStorage.getItem("token");

export const getOffers = async () => {
  const res = await fetch("/api/offers", { headers: { Authorization: token() } });
  return res.json();
};

export const createOffer = async (data) => {
  return fetch("/api/offers", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token() },
    body: JSON.stringify(data)
  });
};

export const updateOffer = async (id, data) => {
  return fetch(`/api/offers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: token() },
    body: JSON.stringify(data)
  });
};

export const deleteOffer = async (id) => {
  return fetch(`/api/offers/${id}`, {
    method: "DELETE",
    headers: { Authorization: token() }
  });
};
