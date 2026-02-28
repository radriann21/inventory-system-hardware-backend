import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.createNewProvider(createProviderDto);
  }

  @Get()
  findAll() {
    return this.providersService.findAllProviders();
  }

  @Get('/name/:name')
  findOne(@Param('name') name: string) {
    return this.providersService.findOneProviderByName(name);
  }

  @Get('/id/:id')
  findOneById(@Param('id') id: string) {
    return this.providersService.findOneProviderById(id);
  }

  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providersService.updateProvider(id, updateProviderDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.providersService.deleteProvider(id);
  }
}
