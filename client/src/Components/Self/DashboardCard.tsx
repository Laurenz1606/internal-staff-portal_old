import React, { ReactElement, ReactNode } from "react";
import Badge from "../Native/Badge";
import Card from "../Native/Card";
import Flex from "../Native/Flex";
import Heading from "../Native/Heading";
import StyledLink from "../Native/StyledLink";

interface DashboardCardProps {
  notifications?: string | null;
  heading: string;
  footer: string;
  to: string;
  children?: ReactNode | ReactNode[];
  size?: "sm" | "lg";
  className?: string;
}

export default function DashboardCard({
  children,
  className,
  footer,
  heading,
  to,
  notifications = null,
  size = "lg",
}: DashboardCardProps): ReactElement {
  return (
    <Card className={className ? className : ""} roundedOnMobile>
      <Card.Header>
        <Flex horizontal="between" className="space-x-2">
          <Heading text={heading} size={size === "lg" ? "h2" : "h4"} />
          <div>
            {notifications ? <Badge text={notifications} size={size} /> : ""}
          </div>
        </Flex>
      </Card.Header>
      <Card.Body noPadding={children ? true : false}>{children}</Card.Body>
      <Card.Footer>
        <StyledLink to={to}>{footer}</StyledLink>
      </Card.Footer>
    </Card>
  );
}
