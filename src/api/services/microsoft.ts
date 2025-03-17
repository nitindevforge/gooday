import { Platform } from "react-native";
import { AuthConfiguration, authorize } from "react-native-app-auth";
import Config from "react-native-config";

export class MicrosoftService {
  config: AuthConfiguration;
  loginUrl: string;
  constructor() {
    this.loginUrl =
      `https://login.microsoftonline.com/${Config.MICROSOFT_TENANT_ID}`;
    this.config = {
      serviceConfiguration: {
        authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      },
      clientId: Config.MICROSOFT_CLIENT_ID!,
      redirectUrl: Platform.select({
        ios: "msauth.com.gooday.main://auth/",
        android: "msauth://com.gooday/Xo8WBi6jzSxKDVR4drqm84yr9iU%3D"
      })!,
      scopes: ["Calendars.Read", "Calendars.ReadWrite", "Calendars.ReadBasic", "Calendars.Read.Shared", "Calendars.ReadWrite.Shared", "offline_access", "openid", "profile"],
      issuer: 'https://login.microsoftonline.com/common',
      useNonce: true,
      usePKCE: true,
      additionalParameters: {
        prompt: 'consent',
      },
    };
  }

  public async getMicrosoftAccessToken() {
    try {
      const authState = await authorize(this.config);
      return authState
    } catch (error) {
      console.log(error,'error')
    }
  }
}
