import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '2ffbb42aa49c93fb977b11958430192b3eb605237c9dff79c58bb76bd29408f7',
    });
  }

  async validate(payload: any) {
    console.log(payload)
    return { userId: payload.sub, username: payload.username };
  }
}
