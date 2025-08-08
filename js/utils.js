document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) window.location.href = "login.html";

  const navUsername = document.getElementById("nav-username");
  if (navUsername) navUsername.textContent = `Logged in as: ${user.name}`;
});
