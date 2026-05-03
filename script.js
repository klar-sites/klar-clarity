function foo() {
  // Option 2: keep arrow, use e.currentTarget
document.querySelector('[aria-label="Toggle theme"]]').addEventListener('mouseover', (e) => {
  console.log('d'); // <header> 
});
  console.log('a');
}
foo(); 