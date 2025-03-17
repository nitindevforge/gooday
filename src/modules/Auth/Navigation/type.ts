export type AuthNavigationParamList = {
  AUTH_SELECTION: undefined;
  AUTH_OPTIONS: {
    role: string;
    authType: 'SIGNUP' | 'SIGNIN'
  };
  SIGN_UP: {
    role: string;
  };
  ROLE: {
    authType: 'SIGNUP' | 'SIGNIN'
  };
  WELCOME: undefined
  LOGIN: {
    role: string;
  }
  FORGOT_PASSWORD: undefined
  RESET_PASSWORD: { email: string, role: string }
  MAIL_VERIFICATION: { email?: string }
  BUSINESS_SOFTWARE_SELECTION: {
    role: string;
  };
  BUSINESS_SOFTWARE_OPTION: {
    role: string;
  };
  BUSINESS_SIGN_UP: {
    role: string;
  };
};