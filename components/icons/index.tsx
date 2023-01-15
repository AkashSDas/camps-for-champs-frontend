import { Icon } from "@chakra-ui/react";

import { pxToRem } from "../../lib/chakra-ui";

interface IconProps {
  className?: string;
  h?: number;
  w?: number;
}

function IconWrapper({
  children,
  className,
  h = 24,
  w = 24,
}: { children: JSX.Element } & IconProps): JSX.Element {
  return (
    <Icon
      display="block"
      className={`icon ${className}`}
      w={pxToRem(w)}
      h={pxToRem(h)}
    >
      {children}
    </Icon>
  );
}

// =====================================
// Icons
// =====================================

export function SearchIcon(props: IconProps): JSX.Element {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22 22L20 20M2 11.5C2 6.25329 6.25329 2 11.5 2C16.7467 2 21 6.25329 21 11.5C21 16.7467 16.7467 21 11.5 21C6.25329 21 2 16.7467 2 11.5Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
}

export function LoginIcon(props: IconProps): JSX.Element {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 10L13.7071 11.2929C13.3166 11.6834 13.3166 12.3166 13.7071 12.7071L15 14M14 12L22 12M6 20C3.79086 20 2 18.2091 2 16V8C2 5.79086 3.79086 4 6 4M6 20C8.20914 20 10 18.2091 10 16V8C10 5.79086 8.20914 4 6 4M6 20H14C16.2091 20 18 18.2091 18 16M6 4H14C16.2091 4 18 5.79086 18 8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </IconWrapper>
  );
}

export function LogoutIcon(props: IconProps): JSX.Element {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 14L21.2929 12.7071C21.6834 12.3166 21.6834 11.6834 21.2929 11.2929L20 10"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 12H13M6 20C3.79086 20 2 18.2091 2 16V8C2 5.79086 3.79086 4 6 4M6 20C8.20914 20 10 18.2091 10 16V8C10 5.79086 8.20914 4 6 4M6 20H14C16.2091 20 18 18.2091 18 16M6 4H14C16.2091 4 18 5.79086 18 8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </IconWrapper>
  );
}

export function UserCircleIcon(props: IconProps): JSX.Element {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="12"
          cy="12"
          r="10"
          strokeWidth="1.5"
          stroke-linejoin="round"
        />
        <path
          d="M17 17C15.5186 15.7256 13.8139 15 12 15C10.1861 15 8.48139 15.7256 7 17"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          r="3"
          transform="matrix(1 0 0 -1 12 9)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
}

export function AddIcon(props: IconProps): JSX.Element {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 6V18M18 12L6 12"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
}

export function FolderIcon(props: IconProps): JSX.Element {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22 17V10C22 7.79086 20.2091 6 18 6H15.3333C14.4679 6 13.6257 5.71929 12.9333 5.2L11.0667 3.8C10.3743 3.28071 9.53215 3 8.66667 3H6C3.79086 3 2 4.79086 2 7V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
}
