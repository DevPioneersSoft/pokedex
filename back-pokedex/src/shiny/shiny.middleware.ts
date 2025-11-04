import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ShinyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    
    const chance = Math.floor(Math.random()*3);
    req['esShiny'] = chance === 1;
    if(req['esShiny']){
      console.log('¡Has encontrado un Pokémon Shiny!');
    }
    next();
  }
}
