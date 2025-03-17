import {ConfigurationService} from '@app/api';
import { GoalsApi } from '@gooday_corp/gooday-api-client';

export class GoalsService extends GoalsApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
