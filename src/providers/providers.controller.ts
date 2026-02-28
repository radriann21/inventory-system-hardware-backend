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
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.createNewProvider(createProviderDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.providersService.findAllProviders();
  }

  @UseGuards(AuthGuard)
  @Get('/name/:name')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('name') name: string) {
    return this.providersService.findOneProviderByName(name);
  }

  @UseGuards(AuthGuard)
  @Get('/id/:id')
  @HttpCode(HttpStatus.OK)
  findOneById(@Param('id') id: string) {
    return this.providersService.findOneProviderById(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providersService.updateProvider(id, updateProviderDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.providersService.deleteProvider(id);
  }
}
