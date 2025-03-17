import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React, { useState } from "react";
import { Modal } from "react-native";
import { BookingDetailModalProps, ModalView } from "./type";
import { MainSectionView } from "./MainSectionView";
import { Details } from "./DetailsView";
import { BookingReschedule } from "./Edit";
import { Availabilities } from "./Time";
import { CancelBooking } from "./CancelBooking";
import { ContactVenue } from "./ContactVenue";
import { EventModal } from "../CreateEventModal/EventModal";

export const BookingDetailsModal = NiceModal.create<BookingDetailModalProps>(
  ({ data = null }) => {
    const { visible, hide } = useModal();
    const [view, setView] = useState<ModalView[]>(["mainSection"]);
    const [date, setDate] = useState<Date>(new Date(data?.startDate!));

    const changeView = (view: ModalView) => {
      setView(prev => [...prev, view]);
    };

    const closeModal = () => {
      if (view?.length === 1) {
        hide();
      } else {
        view.pop()
        setView([...view])
      }
    };

    const reset = () => {
      hide();
      setView(["mainSection"])
    };

    const content = () => {
      switch (view[view?.length - 1]) {
        case "mainSection":
          return (
            <MainSectionView
              data={data!}
              changeView={changeView}
              closeModal={closeModal}
            />
          );
        case "details":
          return (
            <Details
              data={data!}
              changeView={changeView}
              closeModal={closeModal}
            />
          );
        case "edit":
          return (
            <BookingReschedule
              data={data!}
              changeView={changeView}
              closeModal={closeModal}
              setDate={setDate}
              date={date}
            />
          );

        case "time":
          return (
            <Availabilities
              data={data!}
              changeView={changeView}
              closeModal={closeModal}
              date={date}
              reset={reset}
            />
          );

        case "cancel-booking":
          return (
            <CancelBooking
              data={data!}
              changeView={changeView}
              closeModal={closeModal}
              reset={reset}
            />
          );

        case "contact-venue":
          return (
            <ContactVenue
              data={data!}
              changeView={changeView}
              closeModal={closeModal}
              reset={reset}
            />
          );

        case "event-edit":
          return (
            <EventModal
              rowData={data}
              visible={visible}
              hide={() => {
                hide();
                reset()
              }}
            />
          );

        default:
          return null;
      }
    };

    return (
      <Modal
        animationType="slide"
        visible={visible}
        presentationStyle="pageSheet"
      >
        {content()}
      </Modal>
    );
  }
);
