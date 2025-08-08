document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("regName").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.find(u => u.email === email)) {
        alert("User already exists");
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registered successfully");
      window.location.href = "login.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const user = users.find(u => u.email === email && u.password === password);
      if (!user) return alert("Invalid credentials");

      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "dashboard.html";
    });
  }
});
