import { storageService } from "@app/services";
import { Configuration } from "@gooday_corp/gooday-api-client";
import { AUTH_TOKEN_STORAGE_KEY } from "../constants";
import Config from "react-native-config";

export class ConfigurationService {
  configuration: Configuration;

  constructor() {
    this.configuration = {
      basePath: Config.API_URL,
      accessToken: async () => {
        const token = await storageService.getItem(AUTH_TOKEN_STORAGE_KEY);
        return token || "";
      },
      isJsonMime: () => false,
    };
  }
}
