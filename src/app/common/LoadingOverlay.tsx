import React from "react";
import { createPortal } from "react-dom";
import { HashLoader } from "react-spinners";

type LoadingOverlayProps = {
  isLoading: boolean;
  children?: React.ReactNode;
};
const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
  if (!isLoading) {
    return null;
  }

  return createPortal(
    <div className="animate-loadingOverlay-enter fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-8 p-8 text-center">
        <HashLoader color="#563A9C" size={100} aria-label="Loading Spinner" />
        <p className="text-xl text-gray-300">
          Za chwilę nastąpi przekierowanie do płatności.
        </p>
      </div>
    </div>,
    document.body,
  );
};

export default LoadingOverlay;
