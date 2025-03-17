import { useMutation } from "react-query";
import { AddDevicePayload, DeviceAddResponse } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { DEVICE_ADD } from "@app/modules";

export const useDeviceMutation = () => {
    return useMutation<AxiosResponse<DeviceAddResponse>, AxiosError, AddDevicePayload>(
        DEVICE_ADD,
        payload => ApiClient.Device.deviceControllerAddDevice(payload),
    );
};