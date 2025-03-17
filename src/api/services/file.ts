import { ConfigurationService } from '@app/api';
import { GcsApi } from '@gooday_corp/gooday-api-client';

export class FileService extends GcsApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
