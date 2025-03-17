import { ConfigurationService } from '@app/api';
import { NotificationApi } from '@gooday_corp/gooday-api-client';

export class NotificationService extends NotificationApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
