import React, { ReactElement, ReactNode } from "react";

interface ListProps {
  children?: ReactNode | ReactNode[];
}

interface ListItemProps {
  heading: string;
  text: string;
}

export default function List({ children }: ListProps): ReactElement {
  return (
    <div className="flow-root">
      <ul className="divide-y divide-gray-200">{children}</ul>
    </div>
  );
}

List.Item = ({ heading, text }: ListItemProps) => {
  return (
    <li className="py-2 px-3">
      <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
        <h3 className="text-sm font-semibold text-gray-800">
          <a href="#" className="hover:underline focus:outline-none">
            {/* Extend touch target to entire panel */}
            <span className="absolute inset-0" aria-hidden="true" />
            {heading}
          </a>
        </h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{text}</p>
      </div>
    </li>
  );
};
