import {ConfigurationService} from '@app/api';
import { AppApi } from '@gooday_corp/gooday-api-client';

export class AppService extends AppApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
