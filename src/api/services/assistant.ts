import {ConfigurationService} from '@app/api';
import { AIApi } from '@gooday_corp/gooday-api-client';

export class AssistantService extends AIApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
