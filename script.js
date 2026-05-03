function foo() {
  // Option 2: keep arrow, use e.currentTarget
document.querySelector('body').addEventListener('mouseover', (e) => {
  console.log('dsafasdf'); // <header> 
});
  console.log('a');
}
foo(); 