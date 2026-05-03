const closeDropdown = document.querySelector('#closeDropdown');

function resetMenu() {
  const allCategories = document.querySelector('#all-categories');
  allCategories.previousSibling.previousSibling.querySelector('div svg')?.remove();
  allCategories.previousSibling.previousSibling.setAttribute('aria-selected', false);
  allCategories.previousSibling.previousSibling.querySelectorAll('button').remove('bg-muted');
    [...allCategories.querySelectorAll('button')]
      .map((item) => {
        item.remove('bg-muted');
        item.querySelector('div svg')?.remove();
        item.setAttribute('aria-selected', false);
      })
}

function resetMenuTags() {
  const allTags = document.querySelector('#all-tags');
  allTags.previousSibling.previousSibling.querySelector('div svg')?.remove();
  allTags.previousSibling.previousSibling.setAttribute('aria-selected', false);
    [...allTags.querySelectorAll('button')]
      .map((item) => {
        item.querySelector('div svg')?.remove();
        item.setAttribute('aria-selected', false);
      })
}

if (closeDropdown) {
  setTimeout(() => {
    const allCategories = document.querySelector('#all-categories');
    [...allCategories.querySelectorAll('button')]
      .map((item) => {
          item.addEventListener('click', (e) => {
            resetMenu();
            e.currentTarget.classList.add('bg-muted');
            e.currentTarget.setAttribute('aria-selected', true);
            const tag = e.currentTarget.querySelector('div span').innerText;
            const parser = new DOMParser();
            const svgHtml = parser.parseFromString(svgFilter, "text/html");
            e.currentTarget.querySelector('div .gap-2 span').after(svgHtml.querySelector('svg'));
            setPosts(tag, null);
          });
      })

    
      allCategories.previousSibling.previousSibling.addEventListener('click', (e) => {
            resetMenu();
            const parser = new DOMParser();
            const svgHtml = parser.parseFromString(svgFilter, "text/html");
            e.currentTarget.querySelector('span').after(svgHtml.querySelector('svg'));
            setPosts('all', null);
          });


    
    const allTags = document.querySelector('#all-tags');
    [...allTags.querySelectorAll('button')]
      .map((item) => {
          item.addEventListener('click', (e) => {
            let selectedCategory = allCategories.querySelector('[aria-selected="true"]');
            if (!selectedCategory) {
              selectedCategory = 'all';
            } else {
              selectedCategory = selectedCategory.querySelector('div span').innerText;
            }
            // console.log(selectedCategory)
            resetMenuTags();
            
            const tag = e.currentTarget.querySelector('div span').innerText;
            const parser = new DOMParser();
            const svgHtml = parser.parseFromString(svgFilter, "text/html");
            e.currentTarget.querySelector('div .gap-2 span').after(svgHtml.querySelector('svg'));
            
            setPosts(selectedCategory, tag);
          });
      })

    
      allTags.previousSibling.previousSibling.addEventListener('click', (e) => {
        let selectedCategory = allCategories.querySelector('[aria-selected="true"]');
            if (!selectedCategory) {
              selectedCategory = 'all';
            } else {
              selectedCategory = selectedCategory.querySelector('div span').innerText;
            }
            // console.log(selectedCategory)    
        resetMenuTags();
            const parser = new DOMParser();
            const svgHtml = parser.parseFromString(svgFilter, "text/html");
            e.currentTarget.querySelector('span').after(svgHtml.querySelector('svg'));
            setPosts(selectedCategory, 'all');
          });
    
  },1000);

  setTimeout(() => {
    const allTags = document.querySelector('#all-tags');
    [...allTags.querySelectorAll('button')]
      .map((item) => {
          item.addEventListener('click', (e) => {
            const tag = e.currentTarget.querySelector('div span').innerText;
            // console.log('asdf', tag)
            setPosts(null, tag);
          });
        
  
      })
  },1000);

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

const svgFilter = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-filter h-3 w-3"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`;

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