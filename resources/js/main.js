import feather from 'feather-icons'
import Modal from './modal'

up.compiler('main', () => {
  feather.replace()
})

up.compiler('.tab', (element) => {
  const currentPage = window.location.pathname

  const elementHref = element.getAttribute('href')

  if (elementHref === currentPage) {
    element.classList.add('active-tab')
    element.classList.remove('inactive-tab')
  } else {
    element.classList.add('inactive-tab')
    element.classList.remove('active-tab')
  }
})

up.compiler('.open-modal-button', (element) => {
  const modal = new Modal()

  element.addEventListener('click', () => {
    modal.show()
    modal.listenToClose()
  })
})
