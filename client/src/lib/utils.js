import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import animationData from "@/assets/lottie-json";
import moment from "moment";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#fd60a2a] text-[#ffd60a] border-[1px] border-[#ffd60abb]",
  "bg-[#06d6a02a] text-[#06d6a0] border-[1px] border-[#06d6a0bb]",
  "bg-[#4cc9f02a] text-[#4cc9f0] border-[1px] border-[#4cc9f0bb]",
];

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0];
};

export const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
};

/**
 * @param {string | Date} time
 * @returns {string}
 */

export const formatLastMessageTime = (time) => {
  if (!time) return "";

  const now = moment();
  const messageTime = moment(time);

  const diffMinutes = now.diff(messageTime, "minutes");
  const diffHours = now.diff(messageTime, "hours");
  const diffDays = now.diff(messageTime, "days");

  if (diffMinutes < 1) return "now";
  if (diffMinutes < 60) return `${diffMinutes}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays <= 7) return `${diffDays}d`;

  const diffWeeks = now.diff(messageTime, "weeks");
  return `${diffWeeks}w`;
};
