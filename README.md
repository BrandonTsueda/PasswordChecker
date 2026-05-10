# PasswordChecker

PasswordChecker is a client-side password strength analyzer built with HTML, CSS, and JavaScript. It gives real-time feedback, an entropy estimate, a strength meter, and a simple checklist without sending the typed password anywhere.

## Why It Matters

This is a lightweight security-awareness project: it demonstrates password composition, entropy, and clear user feedback while keeping the entered password entirely in the browser.

## Features

- Local-only password evaluation.
- Entropy estimate and strength label.
- Requirement checklist for length, case, numbers, and symbols.
- Dark mode.
- Show/hide password toggle.
- No network calls, analytics, or storage.

## Run

Open `index.html` in a browser or publish the folder with GitHub Pages.

## Project Structure

```text
PasswordChecker/
  index.html
  script.js
  style.css
```

## Verification

```powershell
cd C:\dev\Repos\PasswordChecker
Select-String -Path script.js -Pattern "innerHTML"
```

The command should return no matches.

## Portfolio Notes

- Shows practical front-end security education.
- Uses defensive DOM updates instead of injecting HTML strings.
- Keeps the project simple enough to inspect quickly during a portfolio review.
