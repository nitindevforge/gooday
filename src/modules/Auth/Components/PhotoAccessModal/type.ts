import { Options } from "react-native-image-crop-picker";

export type PhotoAccessProps = {
  onFile: (file: string, upload: string) => void;
  visible: boolean;
  hide: () => void;
  mediaType?: Options["mediaType"];
};
