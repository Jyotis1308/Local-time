const insert = document.getElementById('insert');
const themeToggle = document.getElementById('theme-toggle');
const languageSelect = document.getElementById('language');

// Translations
const translations = {
  en: {
    pressKey: 'Press any key to see details',
    key: 'Key',
    keyCode: 'Key Code',
    code: 'Code'
  },
  hi: {
    pressKey: 'कोई भी कुंजी दबाएँ',
    key: 'कुंजी',
    keyCode: 'कुंजी कोड',
    code: 'कोड'
  },
  fr: {
    pressKey: 'Appuyez sur une touche',
    key: 'Touche',
    keyCode: 'Code de Touche',
    code: 'Code'
  }
};

let currentLang = 'en';

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
});

// Language selection
languageSelect.addEventListener('change', (e) => {
  currentLang = e.target.value;
  updateInitialMessage();
});

function updateInitialMessage() {
  const msg = translations[currentLang].pressKey;
  insert.innerHTML = `<div class="key" data-text="pressKey">${msg}</div>`;
}

window.addEventListener('keydown', (e) => {
  const t = translations[currentLang];
  insert.innerHTML = `
    <div class="key">${t.pressKey}</div>
    <table>
      <tr>
        <th>${t.key}</th>
        <th>${t.keyCode}</th>
        <th>${t.code}</th>
      </tr>
      <tr>
        <td>${e.key === ' ' ? 'Space' : e.key}</td>
        <td>${e.keyCode}</td>
        <td>${e.code}</td>
      </tr>
    </table>
  `;
});

updateInitialMessage(); // Initial setup


