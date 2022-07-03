import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { LoggerContract } from '@ioc:Adonis/Core/Logger'
import { ProfilerRowContract } from '@ioc:Adonis/Core/Profiler'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { ResponseContract } from '@ioc:Adonis/Core/Response'
import { RouteNode } from '@ioc:Adonis/Core/Route'
import { ViewRendererContract } from '@ioc:Adonis/Core/View'
import { test } from '@japa/runner'
import { exceptionCodeToMessageMap } from 'App/Constants/Exception'
import ExceptionHandler from 'App/Exceptions/Handler'

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
class MockHttpContextContract implements HttpContextContract {
  inspect() {
    throw new Error('Method not implemented.')
  }

  request: RequestContract
  response: ResponseContract = {
    status: (code: number) => ({
      json: (data) => ({
        status: code,
        body: data,
      }),
    }),
  } as any
  logger: LoggerContract
  profiler: ProfilerRowContract
  route?: RouteNode | undefined
  routeKey: string
  params: Record<string, any>
  subdomains: Record<string, any>
  view: ViewRendererContract
}

test.group('ExceptionHandler', () => {
  test('should be able to handle exceptions', async ({ assert }) => {
    const exceptionHandler = new ExceptionHandler()

    Object.values(exceptionCodeToMessageMap).forEach(async (exception) => {
      const { code, status, message } = exception
      const ctx = new MockHttpContextContract()
      const error = { code: exception.code }

      const response = await exceptionHandler.handle(error, ctx)

      assert.deepEqual(response.status, status)
      assert.deepEqual(response.body, { code, message })
    })
  })

  test('should bubble up exception if not handled', async ({ assert }) => {
    const exceptionHandler = new ExceptionHandler()

    const ctx = new MockHttpContextContract()
    const error = { code: 'unknown' }

    assert.rejects(() => exceptionHandler.handle(error, ctx))
  })
})
