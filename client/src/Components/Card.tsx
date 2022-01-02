import React, { ReactElement } from "react";

interface Props {
  children?: ReactElement[] | ReactElement | string;
}

export default function Card({
  children,
  roundedOnMobile = false,
}: Props & { roundedOnMobile?: boolean }): ReactElement {
  return (
    <div
      className={
        "bg-white overflow-hidden shadow divide-y divide-gray-200 " +
        (!roundedOnMobile ? "sm:rounded-lg" : "rounded-lg")
      }
    >
      {children}
    </div>
  );
}

Card.Header = function ({ children }: Props): ReactElement {
  return <div className="px-4 py-5 sm:px-6">{children}</div>;
};

Card.Body = function ({ children }: Props): ReactElement {
  return <div className="px-4 py-5 sm:p-6">{children}</div>;
};

Card.Footer = function ({ children }: Props): ReactElement {
  return <div className="px-4 py-4 sm:px-6">{children}</div>;
};
