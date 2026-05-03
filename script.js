document.querySelector('[aria-label="Toggle theme"]').addEventListener('click', (e) => {
  try {
  var d = document.documentElement,
  c = d.classList;
  var e = localStorage.getItem('theme');
  if (!e || e === 'light') {
    d.style.colorScheme = 'dark';
    c.classList.remove('light');
    c.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    d.style.colorScheme = 'light';
    c.add('light');
    localStorage.setItem('theme', 'light');
  }
} catch (e) {}
});