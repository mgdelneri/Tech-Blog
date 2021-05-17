const signupForm = async function (event) {
  event.preventDefault();

  const usernameElement = document.querySelector("#username-signup");
  const passwordElement = document.querySelector("#password-signup");

  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username: usernameElement.value,
      password: passwordElement.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to sign up.");
  }
};

document.querySelector("#signup-form").addEventListener("submit", signupForm);
