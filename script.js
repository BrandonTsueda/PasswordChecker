const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const feedback = document.getElementById('feedback');
const themeToggle = document.getElementById('theme-toggle');
const visibilityToggle = document.getElementById('visibility-toggle');
const checklist = document.getElementById('checklist');

const checks = [
  { label: 'At least 12 characters', test: (value) => value.length >= 12 },
  { label: 'Upper and lowercase letters', test: (value) => /[a-z]/.test(value) && /[A-Z]/.test(value) },
  { label: 'At least one number', test: (value) => /[0-9]/.test(value) },
  { label: 'At least one symbol', test: (value) => /[^A-Za-z0-9]/.test(value) },
  { label: 'No obvious repeated sequence', test: (value) => !/(.)\1{2,}/.test(value) },
];

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const darkMode = document.body.classList.contains('dark-mode');
  themeToggle.textContent = darkMode ? 'Light' : 'Dark';
  themeToggle.setAttribute('aria-pressed', String(darkMode));
});

visibilityToggle.addEventListener('click', () => {
  const shouldShow = passwordInput.type === 'password';
  passwordInput.type = shouldShow ? 'text' : 'password';
  visibilityToggle.textContent = shouldShow ? 'Hide' : 'Show';
  visibilityToggle.setAttribute('aria-pressed', String(shouldShow));
});

passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  const result = evaluatePassword(password);
  updateStrengthBar(result.score, result.percent);
  feedback.textContent = `${result.feedback} Entropy estimate: ${result.entropy.toFixed(2)} bits.`;
  renderChecklist(password);
});

function evaluatePassword(password) {
  let score = 0;
  let feedbackText = 'Too short.';
  const charsetSize = getCharsetSize(password);
  const entropy = password.length > 0 && charsetSize > 0 ? Math.log2(Math.pow(charsetSize, password.length)) : 0;

  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 16 && !/(.)\1{2,}/.test(password)) score++;

  switch (score) {
    case 0:
    case 1:
      feedbackText = 'Very weak.';
      break;
    case 2:
      feedbackText = 'Weak.';
      break;
    case 3:
      feedbackText = 'Moderate.';
      break;
    case 4:
      feedbackText = 'Strong.';
      break;
    case 5:
      feedbackText = 'Excellent.';
      break;
  }

  return { score, feedback: feedbackText, entropy, percent: Math.min(score * 20, 100) };
}

function updateStrengthBar(score, percent) {
  const colors = ['#d92d20', '#f97316', '#eab308', '#65a30d', '#16a34a'];
  strengthBar.style.backgroundColor = colors[Math.max(score - 1, 0)];
  strengthBar.style.width = `${percent}%`;
}

function getCharsetSize(password) {
  let size = 0;
  if (/[a-z]/.test(password)) size += 26;
  if (/[A-Z]/.test(password)) size += 26;
  if (/[0-9]/.test(password)) size += 10;
  if (/[^A-Za-z0-9]/.test(password)) size += 32;
  return size;
}

function renderChecklist(password) {
  checklist.replaceChildren();
  for (const item of checks) {
    const passed = item.test(password);
    const row = document.createElement('li');
    row.className = passed ? 'passed' : '';
    row.textContent = `${passed ? 'OK' : '--'} ${item.label}`;
    checklist.appendChild(row);
  }
}

renderChecklist('');
updateStrengthBar(0, 0);
