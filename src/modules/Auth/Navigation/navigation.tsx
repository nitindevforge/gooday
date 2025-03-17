import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Fragment } from "react";
import {
  AuthOptionsScreen,
  AuthSelectionScreen,
  ForgotPasswordScreen,
  LoginScreen,
  ResetPasswordScreen,
  RoleScreen,
  SignUpScreen,
  WelcomeScreen,
  MailVerificationScreen,
  BusinessSoftwareSelectionScreen,
  BusinessSoftwareOptionScreen,
  BusinessSignUpScreen,
} from "@app/modules";
import { AuthNavigationParamList } from "./type";

const AuthNavigationStack =
  createNativeStackNavigator<AuthNavigationParamList>();

const AuthNavigation = () => {
  return (
    <Fragment>
      <AuthNavigationStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthNavigationStack.Screen
          name="AUTH_SELECTION"
          component={AuthSelectionScreen}
        />
        <AuthNavigationStack.Screen name="ROLE" component={RoleScreen} />
        <AuthNavigationStack.Screen
          name="AUTH_OPTIONS"
          component={AuthOptionsScreen}
        />
        <AuthNavigationStack.Screen name="SIGN_UP" component={SignUpScreen} />
        <AuthNavigationStack.Screen name="LOGIN" component={LoginScreen} />
        <AuthNavigationStack.Screen name="FORGOT_PASSWORD" component={ForgotPasswordScreen} />
        <AuthNavigationStack.Screen name="MAIL_VERIFICATION" component
          ={MailVerificationScreen} />
        <AuthNavigationStack.Screen name="RESET_PASSWORD" component={ResetPasswordScreen} />

        <AuthNavigationStack.Screen
          name="WELCOME"
          component={WelcomeScreen}
        />

        <AuthNavigationStack.Screen name="BUSINESS_SOFTWARE_SELECTION" component={BusinessSoftwareSelectionScreen} />
        <AuthNavigationStack.Screen name="BUSINESS_SOFTWARE_OPTION" component={BusinessSoftwareOptionScreen} />
        <AuthNavigationStack.Screen name="BUSINESS_SIGN_UP" component={BusinessSignUpScreen} />
      </AuthNavigationStack.Navigator>
    </Fragment>
  );
};

export default AuthNavigation;
