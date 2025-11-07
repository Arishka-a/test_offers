// export async function login(login, password) {
//   const res = await fetch("/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ login, password })
//   });
//   return res.json();
// }

export async function login(login, password) {
  if (login === "admin" && password === "admin") {
    return { success: true, token: "FAKE_TOKEN" }; // временный токен
  }
  return { success: false };
}
