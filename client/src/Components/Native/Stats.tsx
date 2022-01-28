import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import React, { FC, ReactElement, ReactNode } from "react";
import StyledLink from "./StyledLink";

interface StatsProps {
  children: ReactNode | ReactNode;
  heading: string;
}

interface StatsItemProps {
  name: string;
  Icon: FC<{ className: string }>;
  stat: string;
  to: string;
  changeType?: "increase" | "decrease";
  change?: string;
  changeText?: string;
}

export default function Stats({ children, heading }: StatsProps): ReactElement {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">{heading}</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </dl>
    </div>
  );
}

Stats.Item = function ({
  Icon,
  change,
  changeType,
  name,
  stat,
  to,
  changeText,
}: StatsItemProps) {
  return (
    <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
      <dt>
        <div className="absolute bg-indigo-500 rounded-md p-3">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <p className="ml-16 text-sm font-medium text-gray-500 truncate">
          {name}
        </p>
      </dt>
      <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900">{stat}</p>
        {change ? (
          <p
            className={
              (changeType === "increase" ? "text-green-600" : "text-red-600") +
              " ml-2 flex items-baseline text-sm font-semibold"
            }
          >
            {changeType === "increase" ? (
              <ArrowSmUpIcon
                className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                aria-hidden="true"
              />
            ) : (
              <ArrowSmDownIcon
                className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            )}
            {change + " " + (changeText ? changeText : "")}
          </p>
        ) : (
          ""
        )}
        <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
          <div className="text-sm">
            <StyledLink to={to}>Details</StyledLink>
          </div>
        </div>
      </dd>
    </div>
  );
};
