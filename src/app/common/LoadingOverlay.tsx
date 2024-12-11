import React from "react";
import { createPortal } from "react-dom";
import { CircleLoader } from "react-spinners";

type LoadingOverlayProps = {
  isLoading: boolean;
  children?: React.ReactNode;
};
const LoadingOverlay = ({ isLoading, children }: LoadingOverlayProps) => {
  if (!isLoading) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <CircleLoader
        className="text-primary-DEFAULT_PURPLE_FONT_COLOR"
        size={60}
        aria-label="Loading Spinner"
      />
    </div>,
    document.body,
  );
};

export default LoadingOverlay;
