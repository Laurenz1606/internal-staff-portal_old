import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  children: string;
}

export default function StyledLink({ children, to }: Props): ReactElement {
  return (
    <Link className="font-medium text-indigo-600 hover:text-indigo-500" to={to}>
      {children}
    </Link>
  );
}
