import { FC } from "react";

const IconChevronDown: FC<{ color?: string }> = ({ color = "#637381" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.4107 6.91074C4.73614 6.5853 5.26378 6.5853 5.58922 6.91074L9.99996 11.3215L14.4107 6.91074C14.7361 6.5853 15.2638 6.5853 15.5892 6.91074C15.9147 7.23618 15.9147 7.76382 15.5892 8.08925L10.5892 13.0892C10.2638 13.4147 9.73614 13.4147 9.41071 13.0892L4.4107 8.08925C4.08527 7.76382 4.08527 7.23618 4.4107 6.91074Z"
        fill={color}
      />
    </svg>
  );
};

export default IconChevronDown;
