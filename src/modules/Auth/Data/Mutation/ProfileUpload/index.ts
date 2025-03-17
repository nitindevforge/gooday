import { useMutation } from 'react-query';
import { ApiClient } from '@app/api';
import { FileNameUploadDTO, SignedUrlResponseDTO } from '@gooday_corp/gooday-api-client';
import { AxiosError, AxiosResponse } from 'axios';
import { PROFILE } from '@app/modules';

export const useProfilePictureMutation = () => {
  return useMutation<AxiosResponse<SignedUrlResponseDTO>, AxiosError, FileNameUploadDTO>(
    PROFILE,
    payload => ApiClient.File.gcpControllerUploadFile(payload),
  );
};
