import axios from "axios";
import { Buffer } from "buffer";

export const uploadImage = async (url: string, buffer: Buffer) => {
  await axios.put(url, buffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
