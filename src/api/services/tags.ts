import { TagsApi } from "@gooday_corp/gooday-api-client";
import { ConfigurationService } from "./configuration";

export class TagsService extends TagsApi {
  constructor(
    configurationService: ConfigurationService = new ConfigurationService()
  ) {
    super(configurationService.configuration);
  }
}
