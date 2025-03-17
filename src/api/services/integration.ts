import { ConfigurationService } from '@app/api';
import { IntegrationApi } from '@gooday_corp/gooday-api-client';

export class IntegrationService extends IntegrationApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}