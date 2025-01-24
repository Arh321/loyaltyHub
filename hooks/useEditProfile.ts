import { useState } from "react";

export interface OpenEditPayload {
  sectionName: "defaultAddress" | "additional" | "mandatory";
  inputId: string;
  show: boolean;
}

const useEditProfile = () => {
  const [sectionNameToEdit, setSectionNameToEdit] = useState<
    "defaultAddress" | "additional" | "mandatory" | string
  >("");
  const [open, setOpen] = useState(false);

  const showEditModal = (payload: OpenEditPayload) => {
    setSectionNameToEdit(() => payload.sectionName);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return {
    open,
    sectionNameToEdit,
    showEditModal,
    onClose,
  };
};

export default useEditProfile;
