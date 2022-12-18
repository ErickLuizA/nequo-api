export default class Modal {
  constructor() {
    this.element = document.querySelector('.disabled-modal-container')
  }

  show() {
    document.body.classList.add('modal-open')
    this.element.classList.add('modal-container')
    this.element.classList.remove('disabled-modal-container')
  }

  hide() {
    document.body.classList.remove('modal-open')
    this.element.classList.remove('modal-container')
    this.element.classList.add('disabled-modal-container')
  }

  listenToClose() {
    const closeButton = this.element.querySelector('.close-modal-button')

    closeButton.addEventListener('click', () => {
      this.hide()
    })

    this.element.addEventListener('click', (event) => {
      if (event.target === this.element) {
        this.hide()
      }
    })
  }
}
