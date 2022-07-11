// app entrypoint
import feather from 'feather-icons'

feather.replace({ class: 'icon' })

const tabs = document.querySelectorAll('.tab')

tabs.forEach((tab) => {
  const currentPage = window.location.pathname

  if (tab.getAttribute('href') === currentPage) {
    tab.classList.add('active')
    tab.classList.remove('inactive')
  } else {
    tab.classList.remove('active')
    tab.classList.add('inactive')
  }
})
