import React, { Children, ReactElement } from "react";

interface Props {
  children: string;
}

export default function Divider({ children }: Props): ReactElement {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 bg-white text-sm text-gray-500">{children}</span>
      </div>
    </div>
  );
}
