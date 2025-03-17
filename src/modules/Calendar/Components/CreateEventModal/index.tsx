import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal } from "react-native";
import { EventModal } from "./EventModal";

interface CreateEventModalProps {
  rowData?: any;
  userId?: any;
}
export const CreateEventModal = NiceModal.create<CreateEventModalProps>(
  ({ rowData = null, userId }) => {
    const { visible, hide } = useModal();

    return (
      <Modal
        animationType="slide"
        visible={visible}
        presentationStyle="pageSheet"
      >
        <EventModal rowData={rowData} userId={userId} visible={visible} hide={hide} />
      </Modal>
    );
  }
);
