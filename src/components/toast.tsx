import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

export type TToast = {
  style?: "success" | "error" | "default";
  title: string;
  message: string;
  className?: string;
  onCloseButtonClick?: () => void;
};

export function Toast({
  style = "default",
  title,
  message,
  className,
  onCloseButtonClick,
}: TToast) {
  return (
    <div
      data-style={style}
      className={twMerge(
        "w-96 text-white z-50 rounded-lg p-2 text-sm shadow-md bg-gray-700/80 backdrop-blur-sm border-l-8 data-[style=default]:border-gray-700 data-[style=success]:border-green-500 data-[style=error]:border-red-500",
        className
      )}
    >
      <div className="flex items-center justify-between border-b-[1px] border-gray-300/30 mb-1 pb-1">
        <h5 className="truncade line-clamp-1">{title}</h5>

        <button
          onClick={onCloseButtonClick}
          type="button"
          className="p-1 rounded hover:bg-gray-300/30 transition-colors text-white cursor-pointer"
        >
          <X size={15} />
        </button>
      </div>

      <p className="line-clamp-2" title={message}>
        {message}
      </p>
    </div>
  );
}
