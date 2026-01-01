const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 90);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = launchDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0"
  );

  if (distance < 0) {
    clearInterval(countdownInterval);
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
  }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

function handleNotify() {
  const emailInput = document.getElementById("emailInput");
  const message = document.getElementById("message");
  const email = emailInput.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    showMessage("Please enter your email address", "error");
    return;
  }

  if (!emailRegex.test(email)) {
    showMessage("Please enter a valid email address", "error");
    return;
  }

  const subscribers = JSON.parse(localStorage.getItem("subscribers") || "[]");

  if (subscribers.includes(email)) {
    showMessage("You are already subscribed!", "error");
    return;
  }

  subscribers.push(email);
  localStorage.setItem("subscribers", JSON.stringify(subscribers));

  showMessage("Thank you! We'll notify you when we launch.", "success");
  emailInput.value = "";
}

function showMessage(text, type) {
  const message = document.getElementById("message");
  message.textContent = text;
  message.className = `message ${type}`;
  message.style.display = "block";

  setTimeout(() => {
    message.style.display = "none";
  }, 5000);
}

document
  .getElementById("emailInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleNotify();
    }
  });
