import { LoadingUi, Typography } from "@app/ui";
import React, { Fragment } from "react";
import RNWebview, { WebViewProps } from "react-native-webview";

export const Webview: React.FC<WebViewProps> = ({ ...props }) => {
  return (
    <Fragment>
      <RNWebview
        {...props}
        startInLoadingState
        renderLoading={() => <LoadingUi loading={true} />}
        renderError={() => <Typography>Something went wrong!!</Typography>}
      />
    </Fragment>
  );
};
