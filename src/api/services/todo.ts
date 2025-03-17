import {ConfigurationService} from '@app/api';
import { TodoApi } from '@gooday_corp/gooday-api-client';

export class TodoService extends TodoApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
