const closeDropdown = document.querySelector('#closeDropdown');

if (closeDropdown) {
  setTimeout(() => {
    const allCategories = document.querySelector('#all-categories');
    [...allCategories.querySelectorAll('button div span'))]
      .map((item) => 
        item.addEventListener('click', (e) => {
          const tag = e.currentTarget.innerText;
          console.log(tag);
        });}), 1000)
  
  document.querySelector('[aria-label="Filter by Category"]').addEventListener('click', (e) => {
    const button = e.currentTarget; 
    const chevron = button.querySelector('svg');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    let dropDown = button.nextSibling;
    if (!dropDown.classList) {
      dropDown = dropDown.nextSibling;
    }
    
    if (isExpanded) {
      button.querySelector('svg').classList.remove('rotate-180');
      button.setAttribute('aria-expanded', false);
      dropDown.classList.add('hidden');
    } else {
      button.querySelector('svg').classList.add('rotate-180');
      button.setAttribute('aria-expanded', true);
      dropDown.classList.remove('hidden');
      closeDropdown.classList.remove('hidden');
      closeDropdown.addEventListener('click', (e) => {
        button.querySelector('svg').classList.remove('rotate-180');
        button.setAttribute('aria-expanded', false);
        dropDown.classList.add('hidden');
        closeDropdown.classList.add('hidden');
      });
    }
  });
  
  document.querySelector('[aria-label="Filter by Tag"]').addEventListener('click', (e) => {
    const button = e.currentTarget;
    const chevron = button.querySelector('svg');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    let dropDown = button.nextSibling;
    if (!dropDown.classList) {
      dropDown = dropDown.nextSibling;
    }
    
    if (isExpanded) {
      button.querySelector('svg').classList.remove('rotate-180');
      button.setAttribute('aria-expanded', false); 
      dropDown.classList.add('hidden');
    } else {
      button.querySelector('svg').classList.add('rotate-180');
      button.setAttribute('aria-expanded', true);
      dropDown.classList.remove('hidden');
      closeDropdown.classList.remove('hidden');
      closeDropdown.addEventListener('click', (e) => {
        button.querySelector('svg').classList.remove('rotate-180');
        button.setAttribute('aria-expanded', false); 
        dropDown.classList.add('hidden');
        closeDropdown.classList.add('hidden');
      });
    }
  });
}

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