import {ConfigurationService} from '@app/api';
import { PlansApi } from '@gooday_corp/gooday-api-client';

export class PlansService extends PlansApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
