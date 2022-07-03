export enum ExceptionCode {
  E_ROW_NOT_FOUND = 'E_ROW_NOT_FOUND',
  E_ROUTE_NOT_FOUND = 'E_ROUTE_NOT_FOUND',
  E_VALIDATION_FAILURE = 'E_VALIDATION_FAILURE',
  E_UNAUTHORIZED_ACCESS = 'E_UNAUTHORIZED_ACCESS',
  E_FORBIDDEN_ACCESS = 'E_FORBIDDEN_ACCESS',
}

export enum ExceptionMessage {
  E_ROW_NOT_FOUND = 'Row Not Found',
  E_ROUTE_NOT_FOUND = 'Route Not Found',
  E_VALIDATION_FAILURE = 'Invalid Validation',
  E_UNAUTHORIZED_ACCESS = 'Unauthorized Access',
  E_FORBIDDEN_ACCESS = 'Forbidden Access',
}

export enum HttpCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  UNPROCESSABLE_ENTITY = 422,
  VALIDATION_FAILURE = 422,
  INTERNAL_SERVER_ERROR = 500,
}

interface ExceptionCodeToMessageMap {
  [key: string]: {
    code: ExceptionCode
    status: HttpCode
    message: string
  }
}

export const exceptionCodeToMessageMap: ExceptionCodeToMessageMap = {
  [ExceptionCode.E_ROW_NOT_FOUND]: {
    code: ExceptionCode.E_ROW_NOT_FOUND,
    message: ExceptionMessage.E_ROW_NOT_FOUND,
    status: HttpCode.NOT_FOUND,
  },
  [ExceptionCode.E_ROUTE_NOT_FOUND]: {
    code: ExceptionCode.E_ROUTE_NOT_FOUND,
    message: ExceptionMessage.E_ROUTE_NOT_FOUND,
    status: HttpCode.NOT_FOUND,
  },
  [ExceptionCode.E_VALIDATION_FAILURE]: {
    code: ExceptionCode.E_VALIDATION_FAILURE,
    message: ExceptionMessage.E_VALIDATION_FAILURE,
    status: HttpCode.VALIDATION_FAILURE,
  },
  [ExceptionCode.E_UNAUTHORIZED_ACCESS]: {
    code: ExceptionCode.E_UNAUTHORIZED_ACCESS,
    message: ExceptionMessage.E_UNAUTHORIZED_ACCESS,
    status: HttpCode.UNAUTHORIZED,
  },
  [ExceptionCode.E_FORBIDDEN_ACCESS]: {
    code: ExceptionCode.E_FORBIDDEN_ACCESS,
    message: ExceptionMessage.E_FORBIDDEN_ACCESS,
    status: HttpCode.FORBIDDEN,
  },
}
