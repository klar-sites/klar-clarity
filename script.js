document.querySelector('[aria-label="Filter by Category"]').addEventListener('click', (e) => {
  const button = e.target;
  console.log(this); 
  button.querySelector('svg').classList.add('rotate-180');
  
});

document.querySelector('[aria-label="Toggle theme"]').addEventListener('click', (e) => {
  try {
    var d = document.documentElement,
    c = d.classList;
    var e = localStorage.getItem('theme');
    if (!e || e === 'light') {
      d.style.colorScheme = 'dark';
      c.remove('light');
      c.add('dark');
      localStorage.setItem('theme', 'dark');
    } else { 
      d.style.colorScheme = 'light';
      c.remove('dark');
      c.add('light');
      localStorage.setItem('theme', 'light');
    }
  } catch (e) {
      console.log(e)
  }
});