import { ConfigurationService } from '@app/api';
import { PrepaidServiceApi } from '@gooday_corp/gooday-api-client';

export class PrepaidService extends PrepaidServiceApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
