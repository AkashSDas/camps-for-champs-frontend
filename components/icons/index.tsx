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
