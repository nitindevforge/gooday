import { ConfigurationService } from '@app/api';
import { EventsApi } from '@gooday_corp/gooday-api-client';

export class EventService extends EventsApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
