import { animate, cubic, setupEndValue } from './animate'

const catalogList = document.querySelector('.catalog__list')

let popupWrapper = null
let popup = null
let closePopupBtn = null
let popupList = null

const onPopupListScroll = (evt) => {
  if (popupList.scrollTop > 5) {
    popupList.style.boxShadow = 'inset 0px 1px 2px 0px rgba(0, 0, 0, 0.25)'
  } else {
    popupList.style.boxShadow = ''
  }
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
        popup.style.top = `${setupEndValue(100, 10, progress)}vh`
        popupWrapper.style.backgroundColor = `rgba(0,0,0, ${setupEndValue(
          0,
          0.7,
          progress
        )})`
      },
    }).then(() => {
      document.body.style.overflow = ''
      popup.style.top = ''
      popupWrapper.style.display = ''
      document.body.style.width = ''
    })

    popupWrapper.removeEventListener('click', closePopup)
    popupList.removeEventListener('scroll', onPopupListScroll)
    closePopupBtn.removeEventListener('click', closePopup)
  }
}

catalogList.addEventListener('click', (evt) => {
  let btn = evt.target.closest('[data-tool-type]')
  if (!btn) return

  let toolType = btn.dataset.toolType
  if (!toolType) return

  // Ищем popup по id = data-tool-type 
  popupWrapper = document.getElementById(`${toolType}`)

  if(!popupWrapper) {
    throw new Error(`Нет каталога с id = ${toolType}`)
  }
  popup = popupWrapper.querySelector('.catalog-popup')
  popupList = popupWrapper.querySelector('.catalog-popup__list')
  closePopupBtn = popupWrapper.querySelector('.catalog-popup__close-btn')

  let bodyWidth = document.body.offsetWidth
  document.body.style.width = `${bodyWidth}px`

  document.body.style.overflow = 'hidden'
  popupWrapper.style.display = 'block'

  animate({
    duration: 450,
    timing: cubic,
    draw(progress) {
      popup.style.top = `${setupEndValue(10, 100, progress)}vh`
      popupWrapper.style.backgroundColor = `rgba(0,0,0, ${setupEndValue(
        0.7,
        0,
        progress
      )})`
    },
  })

  popupWrapper.addEventListener('click', closePopup)
  closePopupBtn.addEventListener('click', closePopup)
  popupList.addEventListener('scroll', onPopupListScroll)
})
