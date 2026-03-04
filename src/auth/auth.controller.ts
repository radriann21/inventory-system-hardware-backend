import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Registrar nuevo usuario',
    description: 'Crea una nueva cuenta de usuario en el sistema',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente',
    schema: {
      example: {
        message: 'User created successfully',
        user: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          username: 'johndoe',
          name: 'John',
          lastname: 'Doe',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o usuario ya existe',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Autentica un usuario y devuelve un token JWT en una cookie httpOnly',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso, token JWT almacenado en cookie',
    schema: {
      example: {
        message: 'Login successful',
        user: {
          username: 'johndoe',
          name: 'John',
          lastname: 'Doe',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, user } = await this.authService.login(loginDto);

    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return {
      message: 'Login successful',
      user: {
        user_id: user.id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
      },
    };
  }

  @ApiOperation({
    summary: 'Cerrar sesión',
    description: 'Elimina la cookie de autenticación del usuario',
  })
  @ApiCookieAuth('access_token')
  @ApiResponse({
    status: 200,
    description: 'Sesión cerrada exitosamente',
    schema: {
      example: {
        message: 'Logout successful',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logout successful' };
  }
}
