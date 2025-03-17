import { ConfigurationService } from '@app/api';
import { WaitlistApi } from '@gooday_corp/gooday-api-client';

export class WaitListService extends WaitlistApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}