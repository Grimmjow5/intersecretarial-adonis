import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ForceJsonResponseMiddleware {
  async handle({request}: HttpContext, next: NextFn) {    
    const header = request.headers();
    header.accept = "application/json"

    return next();    
  }
}