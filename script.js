import { createKlarClient } from 'https://editor.klar.website/sdk/content-static.js';
// ----------------------------
// Klar client
// ----------------------------
const projectData = localStorage.getItem('klar') ? JSON.parse(localStorage.getItem('klar')) : {};
const projectId = projectData.activeProjectId || 404;
window.klar = createKlarClient({
  // projectId: projectData.activeProjectId,
  // baseUrl: 'http://localhost:5173',
  // source: '/static/db.json'
  // source: 'https://editor.klar.website/static/db.json'
  source: location.host ===
    '' ?
    // 'https://editor.klar.website/static/db.json' : '/klar-clarity/assets/db.json'
    `http://localhost:5173/db/${projectId}.json` : `http://localhost:5173/db/${projectId}.json`
});
// window.klarSdk = klar;









const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuToggle.addEventListener('click', (e) => {
  if ([...mobileMenu.classList].includes('hidden')) {
    mobileMenu.classList.remove('hidden');
    mobileMenuToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x h-5 w-5"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';
  } else {
    mobileMenu.classList.add('hidden');
    mobileMenuToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu h-5 w-5"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>';
  }
});

const closeDropdown = document.querySelector('#closeDropdown');

function clearFilters() {
  resetMenu();
  resetMenuTopics();
  resetMenuTags();
  document.querySelector('[aria-label="Filter by Topic"] span').innerText = 'All Topics';
  document.querySelector('[aria-label="Filter by Tag"] span').innerText = 'All Tags';
  const parser = new DOMParser();
  if (document.querySelector('[aria-label="Filter by Category"] span')) {
    document.querySelector('[aria-label="Filter by Category"] span').innerText = 'All Categories';
    const allCategories = document.querySelector('#all-categories');
    const svgHtml = parser.parseFromString(svgFilter, "text/html");
    allCategories.previousSibling.previousSibling.querySelector('span')?.after(svgHtml.querySelector('svg'))
  }
  
  const allTopics = document.querySelector('#all-topics');
  const svgHtmlTopics = parser.parseFromString(svgFilter, "text/html");
  allTopics.previousSibling.previousSibling.querySelector('span')?.after(svgHtmlTopics.querySelector('svg'))
  
  const allTags = document.querySelector('#all-tags');
  const svgHtmlTags = parser.parseFromString(svgFilter, "text/html");
  allTags.previousSibling.previousSibling.querySelector('span')?.after(svgHtmlTags.querySelector('svg'))
  
  const clearFilter = document.querySelector('#clear-filters');
  const filterInfo = document.querySelector('#filter-info');
  clearFilter.classList.add('hidden');
  filterInfo.classList.add('hidden');
}

function resetMenu() {
  const allCategories = document.querySelector('#all-categories');
  if (allCategories) {
    allCategories.previousSibling.previousSibling.querySelector('div svg')?.remove();
    allCategories.previousSibling.previousSibling.setAttribute('aria-selected', false);
    allCategories.previousSibling.previousSibling.classList.remove('bg-muted', 'font-medium');
      [...allCategories.querySelectorAll('button')]
        .map((item) => {
          item.classList.remove('bg-muted', 'font-medium');
          item.querySelector('div svg')?.remove();
          item.setAttribute('aria-selected', false);
        })
  }
}

function resetMenuTopics() {
  const allTopics = document.querySelector('#all-topics');
  allTopics.previousSibling.previousSibling.querySelector('div svg')?.remove();
  allTopics.previousSibling.previousSibling.setAttribute('aria-selected', false);
  allTopics.previousSibling.previousSibling.classList.remove('bg-muted', 'font-medium');
    [...allTopics.querySelectorAll('button')]
      .map((item) => {
        item.classList.remove('bg-muted', 'font-medium');
        item.querySelector('div svg')?.remove();
        item.setAttribute('aria-selected', false);
      })
}

function resetMenuTags() {
  const allTags = document.querySelector('#all-tags');
  allTags.previousSibling.previousSibling.querySelector('div svg')?.remove();
  allTags.previousSibling.previousSibling.setAttribute('aria-selected', false);
  allTags.previousSibling.previousSibling.classList.remove('bg-muted', 'font-medium');
    [...allTags.querySelectorAll('button')]
      .map((item) => {
        item.classList.remove('bg-muted', 'font-medium');
        item.querySelector('div svg')?.remove();
        item.setAttribute('aria-selected', false);
      })
}

if (closeDropdown) {
  const placeHolder = document.querySelector('[aria-label="Filter by Category"] span');
  setTimeout(() => {
    document.querySelector('#clear-filters').addEventListener('click', (e) => {
      clearFilters();
    });
    const allCategories = document.querySelector('#all-categories');
    const allTopics = document.querySelector('#all-topics');
    const allTags = document.querySelector('#all-tags');
    // console.log(allCategories);
    if (allCategories) { 
      [...allCategories.querySelectorAll('button')]
        .map((item) => {
            item.addEventListener('click', (e) => {
              resetMenu();
              e.currentTarget.classList.add('bg-muted', 'font-medium');
              e.currentTarget.setAttribute('aria-selected', true);
              const tag = e.currentTarget.querySelector('div span').innerText;
              const parser = new DOMParser();
              const svgHtml = parser.parseFromString(svgFilter, "text/html");
              e.currentTarget.querySelector('div .gap-2 span').after(svgHtml.querySelector('svg'));
              placeHolder.innerText = tag;

            let selectedTopic = allTopics?.querySelector('[aria-selected="true"]');
            if (!selectedTopic) {
              selectedTopic = 'all';
            } else {
              selectedTopic = selectedTopic.querySelector('div span').innerText;
            }
            let selectedTag = allTags?.querySelector('[aria-selected="true"]');
            // console.log(allTopics)
            if (!selectedTag) {
              selectedTag = 'all';
            } else {
              selectedTag = selectedTag.querySelector('div span').innerText;
            }
              
              setPosts(tag, selectedTag, selectedTopic);
              closeDropdown.click();
            });
        })
  
      
        allCategories.previousSibling.previousSibling.addEventListener('click', (e) => {
              resetMenu();
          e.currentTarget.classList.add('bg-muted', 'font-medium');
              const parser = new DOMParser();
              const svgHtml = parser.parseFromString(svgFilter, "text/html");
              e.currentTarget.querySelector('span').after(svgHtml.querySelector('svg'));
              placeHolder.innerText = 'All Categories';
              let selectedTopic = allTopics?.querySelector('[aria-selected="true"]'); 
              if (!selectedTopic) {
                selectedTopic = 'all';
              } else {
                selectedTopic = selectedTopic.querySelector('div span').innerText;
              }
              let selectedTag = allTags?.querySelector('[aria-selected="true"]');
              // console.log(allTopics)
              if (!selectedTag) {
                selectedTag = 'all';
              } else {
                selectedTag = selectedTag.querySelector('div span').innerText;
              }
              setPosts('all', selectedTag, selectedTopic);
              closeDropdown.click();
            });
    }

    const placeHolderTopics = document.querySelector('[aria-label="Filter by Topic"] span');
    
    [...allTopics.querySelectorAll('button')]
      .map((item) => {
          item.addEventListener('click', (e) => {
            resetMenuTopics();
            e.currentTarget.classList.add('bg-muted', 'font-medium');
            e.currentTarget.setAttribute('aria-selected', true);
            let selectedCategory = allCategories?.querySelector('[aria-selected="true"]');
            if (!selectedCategory) {
              selectedCategory = 'all';
            } else {
              selectedCategory = selectedCategory.querySelector('div span').innerText;
            }
            let selectedTag = allTags?.querySelector('[aria-selected="true"]');
            if (!selectedTag) {
              selectedTag = 'all';
            } else {
              selectedTag = selectedTag.querySelector('div span').innerText;
            }
            const tag = e.currentTarget.querySelector('div span').innerText;
            const parser = new DOMParser();
            const svgHtml = parser.parseFromString(svgFilter, "text/html");
            e.currentTarget.querySelector('div .gap-2 span').after(svgHtml.querySelector('svg'));
            placeHolderTopics.innerText = tag;
            // console.log(selectedCategory)
            setPosts(selectedCategory, selectedTag, tag);
            closeDropdown.click(); 
          });
      })

    
      allTopics.previousSibling.previousSibling.addEventListener('click', (e) => {
        let selectedCategory = allCategories?.querySelector('[aria-selected="true"]');
        resetMenuTopics();
        e.currentTarget.classList.add('bg-muted', 'font-medium');    
        if (!selectedCategory) {
          selectedCategory = 'all';
        } else {
          selectedCategory = selectedCategory.querySelector('div span').innerText;
        }
        let selectedTag = allTags?.querySelector('[aria-selected="true"]');
        if (!selectedTag) {
          selectedTag = 'all';
        } else {
          selectedTag = selectedTag.querySelector('div span').innerText;
        }
        // console.log(selectedCategory)    
    
        const parser = new DOMParser();
        const svgHtml = parser.parseFromString(svgFilter, "text/html");
        e.currentTarget.querySelector('span').after(svgHtml.querySelector('svg'));
        placeHolderTopics.innerText = 'All Topics';
        setPosts(selectedCategory, selectedTag, 'all');
        closeDropdown.click();
      });


    const placeHolderTags = document.querySelector('[aria-label="Filter by Tag"] span');
    
    [...allTags.querySelectorAll('button')]
      .map((item) => {
          item.addEventListener('click', (e) => {
            resetMenuTags();
            e.currentTarget.classList.add('bg-muted', 'font-medium');
            e.currentTarget.setAttribute('aria-selected', true);
            let selectedCategory = allCategories?.querySelector('[aria-selected="true"]');
            if (!selectedCategory) {
              selectedCategory = 'all';
            } else {
              selectedCategory = selectedCategory.querySelector('div span').innerText;
            }
            let selectedTopic = allTopics?.querySelector('[aria-selected="true"]');
            // console.log(allTopics)
            if (!selectedTopic) {
              selectedTopic = 'all';
            } else {
              selectedTopic = selectedTopic.querySelector('div span').innerText;
            }
            const tag = e.currentTarget.querySelector('div span').innerText;
            const parser = new DOMParser();
            const svgHtml = parser.parseFromString(svgFilter, "text/html");
            e.currentTarget.querySelector('div .gap-2 span').after(svgHtml.querySelector('svg'));
            placeHolderTags.innerText = tag;
            setPosts(selectedCategory, tag, selectedTopic);
            closeDropdown.click();
          });
      })

    
      allTags.previousSibling.previousSibling.addEventListener('click', (e) => {
        let selectedCategory = allCategories?.querySelector('[aria-selected="true"]');
        let selectedTopic = allTopics?.querySelector('[aria-selected="true"]');
        resetMenuTags();
        e.currentTarget.classList.add('bg-muted', 'font-medium');    
            if (!selectedCategory) {
              selectedCategory = 'all';
            } else {
              selectedCategory = selectedCategory.querySelector('div span').innerText;
            }
            if (!selectedTopic) {
              selectedTopic = 'all';
            } else {
              selectedTopic = selectedTopic.querySelector('div span').innerText;
            }
            // console.log(selectedCategory)    
        
            const parser = new DOMParser();
            const svgHtml = parser.parseFromString(svgFilter, "text/html");
            e.currentTarget.querySelector('span').after(svgHtml.querySelector('svg'));
            placeHolderTags.innerText = 'All Tags';
            setPosts(selectedCategory, 'all', selectedTopic);
            closeDropdown.click();
          });
  },1000);

  if (document.querySelector('[aria-label="Filter by Category"]')) {
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
  }

  document.querySelector('[aria-label="Filter by Topic"]').addEventListener('click', (e) => {
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