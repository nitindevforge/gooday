import { ConfigurationService } from '@app/api';
import { DeviceApi } from '@gooday_corp/gooday-api-client';

export class DeviceService extends DeviceApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService(),
  ) {
    super(configurationService.configuration);
  }
}
