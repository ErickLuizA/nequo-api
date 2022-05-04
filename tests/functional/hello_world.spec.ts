import { test } from '@japa/runner'

test('should return hello world message', async ({ client }) => {
  const response = await client.get('api/v1/')

  response.assertStatus(200)
  response.assertBodyContains({ message: 'Hello World!' })
})
