import 'unpoly'
import 'unpoly/unpoly.css'
import '../css/app.css'
import feather from 'feather-icons'

up.compiler('main', () => {
  feather.replace({ class: 'icon' })
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
