import { PartialType } from '@nestjs/swagger';
import { CreateCatalogProviderDto } from './create-catalog-provider.dto';

export class UpdateCatalogProviderDto extends PartialType(
  CreateCatalogProviderDto,
) {}
