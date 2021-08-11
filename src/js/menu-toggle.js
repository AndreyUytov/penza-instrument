const $menuToggleBtn = document.querySelector('.contacts-list__toogle-btn')
const $pageHeader = document.querySelector('.page-header')

$menuToggleBtn.addEventListener('click', () => {
  $menuToggleBtn.classList.toggle('contacts-list__toogle-btn--active')
  $pageHeader.classList.toggle('black-fon')

  let scrollToglle = document.body.style.overflow

  scrollToglle
    ? (document.body.style.overflow = '')
    : (document.body.style.overflow = 'hidden')
})
