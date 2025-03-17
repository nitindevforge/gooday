import {
  ConfigureParams,
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import Config from "react-native-config";

export class GoogleService {
  constructor() { }

  public configuration(params?: ConfigureParams) {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
      iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      ...params,
    });
  }

  public async googleSignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        return response;
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            throw new Error("operation (eg. sign in) already in progress")
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            throw new Error("Android only, play services not available or outdated")
          default:
            throw new Error(error.message)
        }
      } else {
        throw error
      }
    }
  }

  public async addScopes(scopes: string[]) {
    await this.configuration({ scopes: scopes });
    return await this.googleSignIn();
  }
}
