import TagChip from './tag-chip'

up.compiler('[data-tag=""]', (element) => {
  const tagChip = new TagChip(element)

  tagChip.activateDeleteButton()
})

up.compiler('#add-tag-form', (element) => {
  const select = element.querySelector('select-pure')
  const tagsContainer = document.querySelector('#tags-container')

  element.addEventListener('submit', (event) => {
    event.preventDefault()

    const values = select.__values

    const parsedValues = values.map((value) => JSON.parse(value))

    const newTags = parsedValues.map((value) => {
      const tagChip = TagChip.create(value)

      tagChip.activateDeleteButton()

      return tagChip.element
    })

    tagsContainer.append(...newTags)
  })
})
