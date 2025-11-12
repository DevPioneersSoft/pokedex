import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class PokedexLoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`!!!! ${req.method} ${req.url} ${new Date().toISOString()}`)
    next();
  }
}
