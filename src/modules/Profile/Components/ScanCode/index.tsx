import React, { useEffect } from "react";
import { Dimensions, View } from "react-native";
import {
  Camera,
  Code,
  CodeScannerFrame,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";

interface ScanCodeProps {
  onFinish: (content: string) => void;
}

export const ScanCode: React.FC<ScanCodeProps> = ({ onFinish }) => {
  const { requestPermission, hasPermission } = useCameraPermission();
  const device = useCameraDevice("back");

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "code-128", "data-matrix"],
    onCodeScanned: (codes: Code[], _: CodeScannerFrame) => {
      if (!codes?.[0]?.value) {
        return null;
      }

      onFinish(codes?.[0]?.value ?? '');
    },
  });

  useEffect(() => {
    requestPermission();
  }, []);

  if (!device) {
    return null;
  }

  if (!hasPermission) {
    return null;
  }

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      <Camera
        style={{ height: Dimensions.get('screen').height }}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
    </View>
  );
};
