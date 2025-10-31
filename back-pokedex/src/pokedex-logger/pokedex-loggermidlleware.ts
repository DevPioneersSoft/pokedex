import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class PokedexLoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: ()=>void ){
        if(req.url.includes('/pokemones')){
            console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
        }

        const chance = Math.floor( Math.random() * 5 );
        req[' shinyFound '] = chance === 1;

        if(req['shinyFound']){
            console.log(" PARECIO UN SHINY")
        }
        next();
    }
}