document.querySelector('[aria-label="Toggle theme"]').addEventListener('click', (e) => {
  try {
  console.log('d'); // <header> 
  var d = document.documentElement,
    c = d.classList;
  c.remove('light', 'dark');
  var e = localStorage.getItem('theme');
    if (!e) {
      d.style.colorScheme = 'dark';
      c.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      d.style.colorScheme = 'light';
      c.add('light');
      localStorage.setItem('theme', 'light');
      
    }
  } else if (e) {
    c.add(e || '')
  }
  if (e === 'light' || e === 'dark') d.style.colorScheme = e
} catch (e) {}
});