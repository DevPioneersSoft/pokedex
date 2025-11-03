import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ShinyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const chance  = Math.floor(Math.random()*5);//probalidad de que nos salga un shyni 5 posibilidades
    req['shinyFound'] = chance === 1;
    if(req['shinyFound']){
      console.log("✨✨✨✨Encontraste un shiny💫💫💫")
    }

    next();
  }
}
