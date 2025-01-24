import { useState } from "react";

export interface OpenEditPayload {
  sectionName: "defaultAddress" | "additional" | "mandatory";
  inputId: string;
  show: boolean;
}

const useEditProfile = () => {
  const [open, setOpen] = useState(false);

  const showEditModal = (payload: OpenEditPayload) => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return {
    open,
    showEditModal,
    onClose,
  };
};

export default useEditProfile;
