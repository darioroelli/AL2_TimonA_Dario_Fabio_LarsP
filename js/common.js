// JavaScript-Code zum Aufklappen und Zuklappen der Navigation
const menuToggle = document.getElementById('menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('change', function() {
  if (menuToggle.checked) {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
});