import { test } from '@japa/runner'
import { slugify } from 'Utils/slugify'

test('should return formatted slug')
  .with([
    { input: 'Hello World', output: 'hello-world' },
    { input: 'Hello World, how are you?', output: 'hello-world-how-are-you' },
    { input: 'HeLLOwOrlD', output: 'helloworld' },
  ])
  .run(({ assert }, row) => {
    assert.equal(slugify(row.input), row.output)
  })
