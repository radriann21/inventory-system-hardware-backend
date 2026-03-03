import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@ApiTags('providers')
@ApiCookieAuth('access_token')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @ApiOperation({
    summary: 'Crear nuevo proveedor',
    description: 'Crea un nuevo proveedor en el sistema',
  })
  @ApiBody({ type: CreateProviderDto })
  @ApiResponse({
    status: 201,
    description: 'Proveedor creado exitosamente',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Tech Supplies Inc.',
        phone_number: '+1-555-0123',
        contact_name: 'John Doe',
        address: '123 Main St, Tech City',
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
    description: 'El proveedor ya existe',
  })
  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.createNewProvider(createProviderDto);
  }

  @ApiOperation({
    summary: 'Obtener todos los proveedores',
    description: 'Retorna una lista con todos los proveedores registrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de proveedores obtenida exitosamente',
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Tech Supplies Inc.',
          phone_number: '+1-555-0123',
          contact_name: 'John Doe',
          address: '123 Main St, Tech City',
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
    return this.providersService.findAllProviders();
  }

  @ApiOperation({
    summary: 'Buscar proveedor por nombre',
    description: 'Busca y retorna un proveedor específico por su nombre',
  })
  @ApiParam({
    name: 'name',
    description: 'Nombre del proveedor a buscar',
    example: 'Tech Supplies',
  })
  @ApiResponse({
    status: 200,
    description: 'Proveedor encontrado',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Tech Supplies Inc.',
        phone_number: '+1-555-0123',
        contact_name: 'John Doe',
        address: '123 Main St, Tech City',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Proveedor no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @UseGuards(AuthGuard)
  @Get('/name/:name')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('name') name: string) {
    return this.providersService.findOneProviderByName(name);
  }

  @ApiOperation({
    summary: 'Buscar proveedor por ID',
    description: 'Busca y retorna un proveedor específico por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del proveedor a buscar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Proveedor encontrado',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Tech Supplies Inc.',
        phone_number: '+1-555-0123',
        contact_name: 'John Doe',
        address: '123 Main St, Tech City',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Proveedor no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @UseGuards(AuthGuard)
  @Get('/id/:id')
  @HttpCode(HttpStatus.OK)
  findOneById(@Param('id') id: string) {
    return this.providersService.findOneProviderById(id);
  }

  @ApiOperation({
    summary: 'Actualizar proveedor',
    description: 'Actualiza los datos de un proveedor existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del proveedor a actualizar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateProviderDto })
  @ApiResponse({
    status: 200,
    description: 'Proveedor actualizado exitosamente',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Tech Supplies Inc.',
        phone_number: '+1-555-9999',
        contact_name: 'Jane Smith',
        address: '456 New Ave, Tech City',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Proveedor no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @UseGuards(AuthGuard)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providersService.updateProvider(id, updateProviderDto);
  }

  @ApiOperation({
    summary: 'Eliminar proveedor',
    description: 'Elimina un proveedor del sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del proveedor a eliminar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 204,
    description: 'Proveedor eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Proveedor no encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.providersService.deleteProvider(id);
  }
}
