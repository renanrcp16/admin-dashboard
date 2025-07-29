"use client";

import { toastListStore } from "@/zustand/toast-list";
import { Toast } from "./toast";

export function ToastList() {
  const { list, remove } = toastListStore();

  return (
    <div className="absolute right-5 bottom-5 flex flex-col gap-3">
      {list.map((t, i) => (
        <Toast
          key={i}
          {...t}
          onCloseButtonClick={() => {
            remove(i);
          }}
        />
      ))}
    </div>
  );
}
