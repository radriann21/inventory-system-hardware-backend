import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
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
import { MeasuresService } from './measures.service';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { UpdateMeasureDto } from './dto/update-measure.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('measures')
@ApiCookieAuth('access_token')
@Controller('measures')
export class MeasuresController {
  constructor(private readonly measuresService: MeasuresService) {}

  @ApiOperation({
    summary: 'Crear nueva unidad de medida',
    description: 'Crea una nueva unidad de medida en el sistema',
  })
  @ApiBody({ type: CreateMeasureDto })
  @ApiResponse({
    status: 201,
    description: 'Unidad de medida creada exitosamente',
    schema: {
      example: {
        id: 1,
        name: 'Unidad',
        abbreviation: 'Und',
        is_active: true,
        createdAt: '2024-03-02T20:30:00.000Z',
        updatedAt: '2024-03-02T20:30:00.000Z',
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
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMeasureDto: CreateMeasureDto) {
    return this.measuresService.create(createMeasureDto);
  }

  @ApiOperation({
    summary: 'Obtener todas las unidades de medida',
    description:
      'Retorna una lista con todas las unidades de medida registradas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de unidades de medida obtenida exitosamente',
    schema: {
      example: [
        {
          id: 1,
          name: 'Unidad',
          abbreviation: 'Und',
          is_active: true,
          createdAt: '2024-03-02T20:30:00.000Z',
          updatedAt: '2024-03-02T20:30:00.000Z',
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.measuresService.findAll();
  }

  @ApiOperation({
    summary: 'Buscar unidad de medida por ID',
    description: 'Busca y retorna una unidad de medida específica por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la unidad de medida',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Unidad de medida encontrada',
    schema: {
      example: {
        id: 1,
        name: 'Unidad',
        abbreviation: 'Und',
        is_active: true,
        createdAt: '2024-03-02T20:30:00.000Z',
        updatedAt: '2024-03-02T20:30:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Unidad de medida no encontrada',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Get('/id/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.measuresService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Actualizar unidad de medida',
    description: 'Actualiza los datos de una unidad de medida existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la unidad de medida a actualizar',
    example: 1,
  })
  @ApiBody({ type: UpdateMeasureDto })
  @ApiResponse({
    status: 200,
    description: 'Unidad de medida actualizada exitosamente',
    schema: {
      example: {
        id: 1,
        name: 'Kilogramo',
        abbreviation: 'Kg',
        is_active: true,
        createdAt: '2024-03-02T20:30:00.000Z',
        updatedAt: '2024-03-02T21:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Unidad de medida no encontrada',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Patch('/update/:id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateMeasureDto: UpdateMeasureDto) {
    return this.measuresService.update(+id, updateMeasureDto);
  }

  @ApiOperation({
    summary: 'Eliminar unidad de medida',
    description: 'Elimina una unidad de medida del sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la unidad de medida a eliminar',
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Unidad de medida eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Unidad de medida no encontrada',
  })
  @ApiResponse({
    status: 401,
    description: 'No autenticado',
  })
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.measuresService.remove(+id);
  }
}
