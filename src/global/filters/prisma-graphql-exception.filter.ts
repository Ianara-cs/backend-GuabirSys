import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { GqlArgumentsHost } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { GraphQLError } from 'graphql'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaGraphQLExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    GqlArgumentsHost.create(host)

    let statusCode = HttpStatus.BAD_REQUEST
    let message = 'Unknown database error'

    switch (exception.code) {
      case 'P2002':
        message =
          'Data conflict: A record with this unique value already exists.'
        statusCode = HttpStatus.CONFLICT
        break
      case 'P2025':
        console.log('Entrou')
        message = 'Record not found.'
        statusCode = HttpStatus.NOT_FOUND
        break
      case 'P2014':
        message = 'Error when trying to delete a record with dependencies.'
        statusCode = HttpStatus.BAD_REQUEST
        break
      default:
        message = exception.message
        break
    }

    console.error('🔥 Prisma Error:', exception.code, exception.message)

    throw new GraphQLError(message, {
      extensions: { code: statusCode, exception },
    })
  }
}
