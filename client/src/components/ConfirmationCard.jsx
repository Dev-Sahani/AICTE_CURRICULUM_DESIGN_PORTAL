import { useState } from "react";
import { Modal, PrimaryButton, SecondaryButton } from "./";

export default function ConfirmationCard({
  confirmAction = () => null,
  cancelAction = () => null,
  onClose,
  description = "",
  heading = "",
}) {
  const [loading, setLoading] = useState(false);
  const handleConfirm = async () => {
    setLoading(true);
    await confirmAction();
    onClose();
    setLoading(false);
  };
  const handleCancel = async () => {
    setLoading(true);
    await cancelAction();
    onClose();
    setLoading(false);
  };

  return (
    <Modal onClose={onClose} className="!w-72 !h-60 !sm:w-96 !sm:h-48">
      <div className="h-full w-full p-4 rounded-xl flex flex-col items-center justify-between gap-2 relative">
        <h3 className="text-xl font-semibold text-center leading-tight">
          {heading}
        </h3>
        <p className="text-center">{description}</p>
        <div className="flex gap-4 justify-between items-center">
          <PrimaryButton onClick={handleConfirm} loading={loading}>
            Ok
          </PrimaryButton>
          <SecondaryButton onClick={handleCancel} loading={loading}>
            Cancel
          </SecondaryButton>
        </div>
      </div>
    </Modal>
  );
}
