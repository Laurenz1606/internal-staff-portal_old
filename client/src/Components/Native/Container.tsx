import React, { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

export default function Container({ children }: Props): ReactElement {
  return <div className="container mx-auto p-4 sm:p-6 lg:p-8">{children}</div>;
}
