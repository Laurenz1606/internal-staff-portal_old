import React, { ReactElement } from "react";

type StatusPosition = "top" | "bottom";
type Statuses = "green" | "yellow" | "red" | "gray";
type Rounded = "md" | "full";
type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface AvatarProps {
  src: string;
  status?: Statuses;
  statusPosition?: StatusPosition;
  rounded?: Rounded;
  size?: Sizes;
}

interface StatusProps {
  status: Statuses;
  statusPosition: StatusPosition;
  rounded: Rounded;
  size: Sizes;
}

function generateSize(size: Sizes) {
  if (size === "xs") return "h-6 w-6";
  if (size === "sm") return "h-8 w-8";
  if (size === "md") return "h-10 w-10";
  if (size === "lg") return "h-12 w-12";
  if (size === "xl") return "h-14 w-14";
  return "h-16 w-16";
}

export default function Avatar({
  src,
  rounded = "full",
  status,
  statusPosition = "top",
  size = "md",
}: AvatarProps): ReactElement {
  return (
    <span className="inline-block relative">
      <img
        className={
          generateSize(size) +
          " " +
          (rounded === "md" ? "rounded-md" : "rounded-full")
        }
        src={src}
        alt=""
      />
      {status ? (
        <Status
          rounded={rounded}
          size={size}
          status={status}
          statusPosition={statusPosition}
        />
      ) : (
        ""
      )}
    </span>
  );
}

function generateStatusPosition(statusPosition: StatusPosition) {
  if (statusPosition === "bottom") return "bottom-0";
  return "top-0";
}

function generateStatusSize(size: Sizes) {
  if (size === "xs") return "h-1.5 w-1.5";
  if (size === "sm") return "h-2 w-2";
  if (size === "md") return "h-2.5 w-2.5";
  if (size === "lg") return "h-3 w-3";
  if (size === "xl") return "h-3.5 w-3.5";
  return "h-4 w-4";
}

function generateStatusColor(status: Statuses) {
  if (status === "green") return "bg-green-400";
  if (status === "yellow") return "bg-yellow-400";
  if (status === "red") return "bg-red-400";
  return "bg-gray-300";
}

function generateStatusTransform(
  rounded: Rounded,
  statusPosition: StatusPosition,
) {
  if (rounded === "md") {
    const transform = "transform translate-x-1/2";
    if (statusPosition === "bottom") return transform + " translate-y-1/2";
    return transform + " -translate-y-1/2";
  }
  return "";
}

function Status({ rounded, size, status, statusPosition }: StatusProps) {
  return (
    <span
      className={
        "absolute " +
        generateStatusPosition(statusPosition) +
        " right-0 " +
        generateStatusTransform(rounded, statusPosition) +
        " block border-2 border-white rounded-full"
      }
    >
      <span
        className={
          "block " +
          generateStatusSize(size) +
          " rounded-full " +
          generateStatusColor(status)
        }
      />
    </span>
  );
}
