import {ConfigurationService} from '@app/api';
import { FriendsApi } from '@gooday_corp/gooday-api-client';

export class FriendsService extends FriendsApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
