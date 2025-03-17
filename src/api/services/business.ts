import { ConfigurationService } from '@app/api';
import { BusinessApi } from '@gooday_corp/gooday-api-client';

export class BusinessService extends BusinessApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
