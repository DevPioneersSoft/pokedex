import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class PokedexLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if(req.url.includes('/pokemon'))
    console.log(`${req.method} ${req.url} ${req.url} ${new Date().toISOString()}`)
    next();
  }
}
