const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const feedback = document.getElementById('feedback');
const toggle = document.createElement('button');
toggle.textContent = 'Toggle Dark Mode';
document.body.prepend(toggle);

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  const result = evaluatePassword(password);
  updateStrengthBar(result.score);
  feedback.innerHTML = `${result.feedback}<br><small>Entropy: ${result.entropy.toFixed(2)} bits</small>`;
});

function evaluatePassword(password) {
  let score = 0;
  let feedback = 'Too short';

  // Calculate entropy
  const charsetSize = getCharsetSize(password);
  const entropy = password.length > 0 ? Math.log2(Math.pow(charsetSize, password.length)) : 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length > 12) score++;

  switch (score) {
    case 0:
    case 1:
      feedback = 'Very weak';
      break;
    case 2:
      feedback = 'Weak';
      break;
    case 3:
      feedback = 'Moderate';
      break;
    case 4:
      feedback = 'Strong';
      break;
    case 5:
      feedback = 'Excellent';
      break;
  }

  return { score, feedback, entropy };
}

function updateStrengthBar(score) {
  const colors = ['#ff4d4d', '#ff944d', '#ffcc00', '#99e600', '#33cc33'];
  strengthBar.style.backgroundColor = colors[Math.max(score - 1, 0)];
}

function getCharsetSize(password) {
  let size = 0;
  if (/[a-z]/.test(password)) size += 26;
  if (/[A-Z]/.test(password)) size += 26;
  if (/[0-9]/.test(password)) size += 10;
  if (/[^A-Za-z0-9]/.test(password)) size += 32; // rough estimate for symbols
  return size;
}
