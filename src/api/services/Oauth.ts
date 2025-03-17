import {ConfigurationService} from '@app/api';
import { OAuthApi } from '@gooday_corp/gooday-api-client';

export class OAuthService extends OAuthApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
