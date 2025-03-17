import { ConfigurationService } from '@app/api';
import { CalendarApi } from '@gooday_corp/gooday-api-client';

export class CalendarService extends CalendarApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
