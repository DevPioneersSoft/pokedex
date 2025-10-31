import { Transform, Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";


export class PrismaQueryParamsDto{
    
    @IsOptional()    
    @Type(()=>Number)
    skip?: number;

    @IsOptional()    
    @Type(()=>Number)
    take?: number;

    @IsOptional()
    @Transform(({value}) =>{
        if(typeof value === 'object'){
                return value;
        }
        try{
            return JSON.parse(value);
        }catch(error){
            return undefined;
        }
    })
    orderBy?: Record<string, any>;

    @IsOptional()
    @Transform(({value}) =>{
        if(typeof value === 'object'){
                return value;
        }
        try{
            return JSON.parse(value);
        }catch(error){
            return undefined;
        }
    })
    where: Record<string, any>;
}