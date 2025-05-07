import React, { memo } from "react";
import clsx from "clsx";
import { LoadingOutlined } from "@ant-design/icons";

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isValid?: boolean;
  loading?: boolean;
  isOutLine?: boolean;
  children?: React.ReactNode;
}

const CtaButton: React.FC<CtaButtonProps> = ({
  isValid = true,
  loading = false,
  children,
  isOutLine,
  className,
  disabled,
  type,
  ...props
}) => {
  return (
    <button
      type={type}
      className={clsx(
        "font-Medium disabled:cursor-not-allowed active:scale-90 transition-all",
        {
          "bg-cta disabled:!bg-cta-disabled hover:bg-cta-hover text-Highlighter":
            !isOutLine,
          "bg-transparent border border-cta disabled:opacity-60": isOutLine,
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {children}
      {loading && (
        <span className="ml-2">
          <LoadingOutlined />
        </span>
      )}
    </button>
  );
};

const MemoizedCtaButton = memo(CtaButton);

export default MemoizedCtaButton;
