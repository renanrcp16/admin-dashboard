"use client";

import { useEffect, useState } from "react";
import { Wrapper } from "./wrapper";
import { X } from "lucide-react";

type TModal = {
  title: string;
  children: React.ReactNode;
  onCloseButtonClick: () => void;
};

export function Modal({ children, title, onCloseButtonClick }: TModal) {
  const [active, setActive] = useState(false);

  function handleCloseButtonClick() {
    onCloseButtonClick();
  }

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.key === "Escape" && handleCloseButtonClick();
    });

    if (!active) {
      setActive(() => true);
    }
  }, []);

  return (
    <div
      aria-disabled={!active}
      className="aria-disabled:bg-gray-950/0 aria-disabled:backdrop-blur-none backdrop-blur-xs transition-all absolute w-full h-screen overflow-hidden left-0 top-0 flex justify-center items-center bg-gray-950/40 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleCloseButtonClick();
        }
      }}
    >
      <Wrapper
        aria-disabled={!active}
        className="bg-gray-800 w-fit h-fit transition-all translate-y-0 opacity-100 aria-disabled:translate-y-2 aria-disabled:opacity-0 p-5"
      >
        <div className="w-full flex justify-between items-center gap-10 border-b-[1px] border-gray-700/50 pb-1 mb-1">
          <h3>{title}</h3>
          <button
            onClick={handleCloseButtonClick}
            type="button"
            className="p-1 rounded bg-gray-700/50 hover:bg-gray-700 transition-colors text-white cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
        {children}
      </Wrapper>
    </div>
  );
}
