import {ConfigurationService} from '@app/api';
import { AuthApi } from '@gooday_corp/gooday-api-client';

export class AuthService extends AuthApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
