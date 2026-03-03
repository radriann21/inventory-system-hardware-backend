import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserParamDTO } from './dto/user-param.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('users')
@ApiCookieAuth('access_token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Crear nuevo usuario',
    description: 'Crea un nuevo usuario en el sistema',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    schema: {
      example: {
        message: 'User created successfully',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @ApiResponse({
    status: 409,
    description: 'El usuario ya existe',
  })
  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Obtener todos los usuarios',
    description:
      'Retorna una lista con todos los usuarios registrados (sin contraseñas)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida exitosamente',
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John',
          lastname: 'Doe',
          username: 'johndoe',
          created_at: '2024-03-02T20:30:00.000Z',
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Buscar usuario por ID',
    description: 'Busca y retorna un usuario específico por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario a buscar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'John',
        lastname: 'Doe',
        username: 'johndoe',
        created_at: '2024-03-02T20:30:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param() params: UserParamDTO) {
    return this.usersService.findOne(params.id);
  }

  @ApiOperation({
    summary: 'Actualizar usuario',
    description: 'Actualiza los datos de un usuario existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario a actualizar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'John',
        lastname: 'Smith',
        username: 'johnsmith',
        created_at: '2024-03-02T20:30:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Eliminar usuario',
    description: 'Elimina un usuario del sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario a eliminar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Usuario eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: UserParamDTO) {
    return this.usersService.remove(params.id);
  }
}
