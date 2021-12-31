import React, { ReactElement } from "react";

interface Props {
  heading: string;
  children: string | ReactElement;
}

export default function FormPage({ heading, children }: Props): ReactElement {
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* img */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {heading}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
