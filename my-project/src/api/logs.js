export const getLogs = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/logs", { headers: { Authorization: token } });
  return res.json();
};