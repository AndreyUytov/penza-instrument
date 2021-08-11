import { animate, cubic, makeToZero, setupEndValue } from './animate'

const $menuToggleBtn = document.querySelector('.contacts-list__toogle-btn')
const $pageHeader = document.querySelector('.page-header')
const $contactsList = document.querySelector('.page-header__contacts-list')

$menuToggleBtn.addEventListener('click', () => {
  $menuToggleBtn.classList.toggle('contacts-list__toogle-btn--active')

  $pageHeader.classList.toggle('black-fon')

  let scrollToglle = document.body.style.overflow

  if (scrollToglle) {
    document.body.style.overflow = ''
    $contactsList.style.display = 'flex'
    animate({
      duration: 400,
      timing: makeToZero(cubic),
      draw(progress) {
        $contactsList.style.left = `${setupEndValue(0, -100, progress)}%`
      },
    }).then(() => {
      $contactsList.style.left = ''
      $contactsList.style.display = ''
    })
  } else {
    document.body.style.overflow = 'hidden'

    animate({
      duration: 400,
      timing: makeToZero(cubic),
      draw(progress) {
        $contactsList.style.left = `${setupEndValue(-100, 0, progress)}%`
      },
    }).then(() => {
      $contactsList.style.left = ''
    })
  }
})
