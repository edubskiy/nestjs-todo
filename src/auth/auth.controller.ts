import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDTO);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.singIn(authCredentialsDTO);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
