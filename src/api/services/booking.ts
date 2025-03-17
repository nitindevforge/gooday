import { ConfigurationService } from "@app/api";
import { BookingApi } from "@gooday_corp/gooday-api-client";

export class BookingService extends BookingApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService()
  ) {
    super(configurationService.configuration);
  }
}
