export default class TagChip {
  #element = null

  constructor(element) {
    this.#element = element
  }

  get element() {
    return this.#element
  }

  // Figure it out why the button event is not working!!

  activateDeleteButton() {
    const button = this.#element.querySelector('button')

    this.#element.addEventListener('mouseover', () => {
      button.classList.remove('hidden')
    })

    this.#element.addEventListener('mouseout', () => {
      button.classList.add('hidden')
    })
  }

  static create(value) {
    const tagContainer = document.createElement('div')
    const tagInput = document.createElement('input')
    const tagHiddenInput = document.createElement('input')
    const tagButton = document.createElement('button')
    const tagIcon = document.createElement('i')

    tagContainer.setAttribute('data-tag', '')
    tagContainer.classList.add('tag-container')

    tagInput.setAttribute('type', 'text')
    tagInput.setAttribute('value', value.name)
    tagInput.setAttribute('disabled', '')
    tagInput.classList.add('input', 'w-auto')

    tagHiddenInput.setAttribute('type', 'hidden')
    tagHiddenInput.setAttribute('name', 'tags[]')
    tagHiddenInput.setAttribute('value', value.id)

    tagButton.setAttribute('type', 'button')
    tagButton.classList.add('hidden', 'ml-2')
    tagButton.setAttribute('up-layer', 'new')

    tagIcon.setAttribute('data-feather', 'x')
    tagIcon.classList.add('w-4')

    tagButton.appendChild(tagIcon)

    tagContainer.appendChild(tagInput)
    tagContainer.appendChild(tagButton)

    return new TagChip(tagContainer)
  }
}
