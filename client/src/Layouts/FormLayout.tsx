import { ReactElement } from "react";
import Flex from "../Components/Native/Flex";
import Heading from "../Components/Native/Heading";

interface Props {
  heading: string;
  children: ReactElement[] | ReactElement;
}

export default function FormLayout({ heading, children }: Props): ReactElement {
  return (
    <Flex horizontal="center" col className="min-h-full py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Flex horizontal="center">
          <Heading text={heading} />
        </Flex>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md w-full">{children}</div>
    </Flex>
  );
}
