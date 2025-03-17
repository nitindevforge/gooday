import { ConfigurationService } from '@app/api';
import { WhatsOnApi } from '@gooday_corp/gooday-api-client';

export class WhatsOnService extends WhatsOnApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
