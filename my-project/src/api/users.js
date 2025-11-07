export const getUsers = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/users", { headers: { Authorization: token } });
  return res.json();
};