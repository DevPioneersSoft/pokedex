import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AutenticacionService } from "../autenticacion.service";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly autenticacionService: AutenticacionService) {
    super({
      usernameField: 'username',
      passwordField: 'contrasena',
    });
  }
  async validate(username: string, password: string): Promise<any> {
    const user = await this.autenticacionService.validarUsuario(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
