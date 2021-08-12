import { animate, back, cubic, makeToZero, setupEndValue } from './animate'

const popupWrapper = document.querySelector('.catalog-popup__wrapper')
const popup = popupWrapper.querySelector('.catalog-popup')
const closePopupBtn = popupWrapper.querySelector('.catalog-popup__close-btn')
const popupTitle = popupWrapper.querySelector('.catalog-popup__title')
const catalogList = document.querySelector('.catalog__list')
const popupList = popupWrapper.querySelector('.catalog-popup__list')

const toolTypeMap = {
  turning: 'Токарные',
  milling: 'Фрезерные',
  boring: 'Сверлильные',
  threading: 'Резьбонарезные',
  locksmith: 'Слесарные',
  abrasive: 'Абразивные',
}

const closePopup = (evt) => {
  evt.preventDefault()
  if (
    evt.target.classList.contains('catalog-popup__wrapper') ||
    evt.target.classList.contains('catalog-popup__close-btn')
  ) {
    animate({
      duration: 450,
      timing: cubic,
      draw(progress) {
        popup.style.top = `${setupEndValue(-100, 0, progress)}%`
      },
    }).then(() => {
      document.body.style.overflow = ''
      popup.style.top = ''
      popupWrapper.style.display = ''
      document.body.style.width = ''
    })

    popupWrapper.removeEventListener('click', closePopup)
  }
}

catalogList.addEventListener('click', (evt) => {
  let btn = evt.target.closest('[data-tool-type]')
  if (!btn) return

  let toolType = toolTypeMap[btn.dataset.toolType]
  if (!toolType) return

  popupTitle.textContent = toolType

  let bodyWidth = document.body.offsetWidth
  document.body.style.width = `${bodyWidth}px`

  document.body.style.overflow = 'hidden'
  popupWrapper.style.display = 'block'

  animate({
    duration: 450,
    timing: makeToZero(back),
    draw(progress) {
      popup.style.top = `${setupEndValue(-100, 0, progress)}%`
    },
  })

  popupWrapper.addEventListener('click', closePopup)
})

closePopupBtn.addEventListener('click', closePopup)

popupList.addEventListener('scroll', (evt) => {
  if (popupList.scrollTop > 5) {
    popupList.style.boxShadow = 'inset 0px 1px 2px 0px rgba(0, 0, 0, 0.25)'
  } else {
    popupList.style.boxShadow = ''
  }
})
