import Config from "react-native-config";

export const getAssetUrl = (image: string = "") => {
  if (!image?.startsWith("/")) {
    image = "/" + image;
  }
  return `${Config?.IMAGE_URL}${image}`;
};
