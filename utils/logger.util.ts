import { logger } from 'hono/logger'
import type { Context, Next } from 'hono'

export const routerLogger = (routeName: string, message?: string) => {
  return async (c: Context, next: Next) => {
    const start = Date.now()

    // Log route info
    logger.info({
      route: routeName,
      method: c.req.method,
      url: c.req.url,
      message: message || ''
    })

    // Execute the next middleware or handler
    await next()

    const duration = Date.now() - start
    logger.info({
      route: routeName,
      duration: `${duration}ms`,
    })
  }
}
