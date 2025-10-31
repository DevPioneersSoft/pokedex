import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class PokedexLoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (
      req.method === 'PATCH' &&
      req.originalUrl.match(/^\/usuario\/(\d+)\/favoritos$/)
    ) {
      console.log('BODY antes:', JSON.stringify(req.body));
      let favoritos = req.body.favoritos;
      if (Array.isArray(favoritos)) {
        if (favoritos.length < 6) {
          if (!favoritos.includes(100)) {
            favoritos.push(100);
          }
        }
        if (favoritos.length > 6) {
          favoritos = favoritos.slice(0, 6);
        }
        req.body.favoritos = favoritos;
      }
      console.log('BODY después:', JSON.stringify(req.body));
    }
    next();
  }
}
