/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import Logger from '@ioc:Adonis/Core/Logger'
import { exceptionCodeToMessageMap } from 'App/Constants/Exception'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error, ctx: HttpContextContract) {
    if (!exceptionCodeToMessageMap[error.code]) {
      return super.handle(error, ctx)
    }

    const { code, status, message } = exceptionCodeToMessageMap[error.code]

    return ctx.response.status(status).json({
      code,
      message,
      ...(error.messages?.errors && { errors: error.messages.errors }),
    })
  }
}
