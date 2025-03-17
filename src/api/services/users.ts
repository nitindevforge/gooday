import {ConfigurationService} from '@app/api';
import {  UsersApi } from '@gooday_corp/gooday-api-client';

export class UsersService extends UsersApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
