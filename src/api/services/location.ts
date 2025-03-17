import { ConfigurationService } from '@app/api';
import { LocationApi } from '@gooday_corp/gooday-api-client';

export class LocationService extends LocationApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
