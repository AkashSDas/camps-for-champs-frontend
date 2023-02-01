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
          strokeLinejoin="round"
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

export function SettingsIcon(props: IconProps): JSX.Element {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.7439 15.7206L20.1043 15.3289V15.3289L20.7439 15.7206ZM19.7894 17.2794L20.429 17.6711V17.6711L19.7894 17.2794ZM3.25609 8.27942L2.61648 7.88775H2.61648L3.25609 8.27942ZM4.21064 6.72057L4.85025 7.11223L4.21064 6.72057ZM6.81852 6.06172L7.1771 5.403L7.1771 5.403L6.81852 6.06172ZM3.95487 10.7383L3.59629 11.397H3.59629L3.95487 10.7383ZM17.1815 17.9383L16.8229 18.597L16.8229 18.597L17.1815 17.9383ZM20.0451 13.2617L19.6866 13.9204V13.9205L20.0451 13.2617ZM4.21064 17.2794L3.57103 17.6711L3.57103 17.6711L4.21064 17.2794ZM3.25609 15.7206L3.8957 15.3289L3.8957 15.3289L3.25609 15.7206ZM19.7894 6.72058L20.429 6.32892V6.32892L19.7894 6.72058ZM20.7439 8.27943L20.1043 8.67109V8.67109L20.7439 8.27943ZM20.0451 10.7383L20.4037 11.397L20.0451 10.7383ZM17.1815 6.06174L17.5401 6.72046V6.72046L17.1815 6.06174ZM3.95487 13.2617L4.31345 13.9205H4.31345L3.95487 13.2617ZM6.81851 17.9383L6.45994 17.2795L6.45993 17.2795L6.81851 17.9383ZM17.08 6.11698L16.7214 5.45825L17.08 6.11698ZM6.92 6.11697L6.56142 6.77569L6.56142 6.77569L6.92 6.11697ZM17.08 17.883L17.4386 17.2243L17.4386 17.2243L17.08 17.883ZM6.92 17.883L7.27858 18.5418L7.27858 18.5418L6.92 17.883ZM11.0455 3.75H12.9545V2.25H11.0455V3.75ZM12.9545 20.25H11.0455V21.75H12.9545V20.25ZM11.0455 20.25C10.3631 20.25 9.88635 19.7389 9.88635 19.2H8.38635C8.38635 20.6493 9.61906 21.75 11.0455 21.75V20.25ZM14.1136 19.2C14.1136 19.7389 13.6369 20.25 12.9545 20.25V21.75C14.3809 21.75 15.6136 20.6493 15.6136 19.2H14.1136ZM12.9545 3.75C13.6369 3.75 14.1136 4.26107 14.1136 4.8H15.6136C15.6136 3.35071 14.3809 2.25 12.9545 2.25V3.75ZM11.0455 2.25C9.61906 2.25 8.38635 3.35071 8.38635 4.8H9.88635C9.88635 4.26107 10.3631 3.75 11.0455 3.75V2.25ZM20.1043 15.3289L19.1498 16.8878L20.429 17.6711L21.3835 16.1122L20.1043 15.3289ZM3.8957 8.67108L4.85025 7.11223L3.57103 6.32891L2.61648 7.88775L3.8957 8.67108ZM4.85025 7.11223C5.15889 6.6082 5.88055 6.40506 6.45993 6.72045L7.1771 5.403C5.93027 4.72428 4.31676 5.11109 3.57103 6.32891L4.85025 7.11223ZM4.31345 10.0795C3.75746 9.77688 3.6043 9.14696 3.8957 8.67108L2.61648 7.88775C1.85352 9.13373 2.32606 10.7055 3.59629 11.397L4.31345 10.0795ZM19.1498 16.8878C18.8411 17.3918 18.1195 17.5949 17.5401 17.2795L16.8229 18.597C18.0697 19.2757 19.6832 18.8889 20.429 17.6711L19.1498 16.8878ZM21.3835 16.1122C22.1465 14.8663 21.6739 13.2945 20.4037 12.603L19.6866 13.9205C20.2425 14.2231 20.3957 14.853 20.1043 15.3289L21.3835 16.1122ZM4.85025 16.8878L3.8957 15.3289L2.61648 16.1122L3.57103 17.6711L4.85025 16.8878ZM19.1498 7.11225L20.1043 8.67109L21.3835 7.88777L20.429 6.32892L19.1498 7.11225ZM20.1043 8.67109C20.3957 9.14697 20.2425 9.77689 19.6866 10.0795L20.4037 11.397C21.6739 10.7055 22.1465 9.13374 21.3835 7.88777L20.1043 8.67109ZM17.5401 6.72046C18.1195 6.40507 18.8411 6.60822 19.1498 7.11225L20.429 6.32892C19.6832 5.1111 18.0697 4.72429 16.8229 5.40301L17.5401 6.72046ZM3.8957 15.3289C3.6043 14.853 3.75746 14.2231 4.31345 13.9205L3.59629 12.603C2.32606 13.2945 1.85352 14.8663 2.61648 16.1122L3.8957 15.3289ZM3.57103 17.6711C4.31675 18.8889 5.93027 19.2757 7.1771 18.597L6.45993 17.2795C5.88055 17.5949 5.15889 17.3918 4.85025 16.8878L3.57103 17.6711ZM17.4386 6.7757L17.5401 6.72046L16.8229 5.40301L16.7214 5.45825L17.4386 6.7757ZM6.45993 6.72045L6.56142 6.77569L7.27858 5.45824L7.1771 5.403L6.45993 6.72045ZM17.5401 17.2795L17.4386 17.2243L16.7214 18.5417L16.8229 18.597L17.5401 17.2795ZM6.56142 17.2243L6.45994 17.2795L7.17709 18.597L7.27858 18.5418L6.56142 17.2243ZM3.59629 11.397C4.07404 11.6571 4.07404 12.3429 3.59629 12.603L4.31345 13.9205C5.83498 13.0922 5.83498 10.9078 4.31345 10.0795L3.59629 11.397ZM7.27858 18.5418C7.77798 18.2699 8.38635 18.6314 8.38635 19.2H9.88635C9.88635 17.4934 8.06035 16.4084 6.56142 17.2243L7.27858 18.5418ZM15.6136 19.2C15.6136 18.6314 16.222 18.2699 16.7214 18.5417L17.4386 17.2243C15.9397 16.4083 14.1136 17.4934 14.1136 19.2H15.6136ZM20.4037 12.603C19.926 12.3429 19.926 11.6571 20.4037 11.397L19.6866 10.0795C18.165 10.9078 18.165 13.0922 19.6866 13.9204L20.4037 12.603ZM6.56142 6.77569C8.06035 7.59165 9.88635 6.50663 9.88635 4.8H8.38635C8.38635 5.3686 7.77798 5.7301 7.27858 5.45824L6.56142 6.77569ZM16.7214 5.45825C16.222 5.73011 15.6136 5.36861 15.6136 4.8H14.1136C14.1136 6.50663 15.9397 7.59166 17.4386 6.7757L16.7214 5.45825ZM14.25 12C14.25 13.2426 13.2426 14.25 12 14.25V15.75C14.0711 15.75 15.75 14.0711 15.75 12H14.25ZM12 14.25C10.7574 14.25 9.75001 13.2426 9.75001 12H8.25001C8.25001 14.0711 9.92894 15.75 12 15.75V14.25ZM9.75001 12C9.75001 10.7574 10.7574 9.75 12 9.75V8.25C9.92894 8.25 8.25001 9.92893 8.25001 12H9.75001ZM12 9.75C13.2426 9.75 14.25 10.7574 14.25 12H15.75C15.75 9.92893 14.0711 8.25 12 8.25V9.75Z" />
      </svg>
    </IconWrapper>
  );
}

export function AlaramIcon(props: IconProps): JSX.Element {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 8V13L15 15"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="13" r="9" strokeWidth="1.5" />
        <path
          d="M16.8034 2C18.927 2.92861 20.7299 4.45412 22 6.36441M7.19658 2C5.07303 2.92861 3.27013 4.45412 2 6.36441"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M21 22L18.7571 19M3 22L5.24272 19"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
}

export function LocationIcon(props: IconProps): JSX.Element {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="11" r="3" strokeWidth="1.5" />
        <path
          d="M21 10.8889C21 15.7981 15.375 22 12 22C8.625 22 3 15.7981 3 10.8889C3 5.97969 7.02944 2 12 2C16.9706 2 21 5.97969 21 10.8889Z"
          strokeWidth="1.5"
        />
      </svg>
    </IconWrapper>
  );
}

export function ReceiptIcon(props: IconProps): JSX.Element {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17 7L7 7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 11L7 11"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 15L7 15"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 2H5C3.89543 2 3 2.89543 3 4V19.1543C3 20.5396 4.37412 21.5053 5.67744 21.0361L7.2392 20.4739C7.72721 20.2982 8.26439 20.319 8.73737 20.5318L11.1793 21.6307C11.7012 21.8655 12.2988 21.8655 12.8207 21.6307L15.2626 20.5318C15.7356 20.319 16.2728 20.2982 16.7608 20.4739L18.3226 21.0361C19.6259 21.5053 21 20.5396 21 19.1543V4C21 2.89543 20.1046 2 19 2Z"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </IconWrapper>
  );
}

export function ActivityIcon(props: IconProps): JSX.Element {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.1797 18C19.5797 18 20.1797 16.65 20.1797 15V9C20.1797 7.35 19.5797 6 17.1797 6C14.7797 6 14.1797 7.35 14.1797 9V15C14.1797 16.65 14.7797 18 17.1797 18Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.82031 18C4.42031 18 3.82031 16.65 3.82031 15V9C3.82031 7.35 4.42031 6 6.82031 6C9.22031 6 9.82031 7.35 9.82031 9V15C9.82031 16.65 9.22031 18 6.82031 18Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.82031 12H14.1803"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.5 14.5V9.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.5 14.5V9.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
}

export function ImageIcon(props: IconProps): JSX.Element {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21.8247 13.8738C21.9398 13.2668 22 12.6404 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 12.7452 2.08151 13.4713 2.23609 14.17M21.8247 13.8738C20.9476 18.501 16.8824 22 12 22C7.22233 22 3.2272 18.6495 2.23609 14.17M21.8247 13.8738L19.061 11.8839C17.5338 10.7843 15.4467 10.898 14.0479 12.1569L9.95209 15.8431C8.55331 17.102 6.4662 17.2157 4.93901 16.1161L2.23609 14.17M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z"
          strokeWidth="1.5"
        />
      </svg>
    </IconWrapper>
  );
}

export function PackageIcon(props: IconProps): JSX.Element {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 7L12 11L4 7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.6246 4.66762L13.6246 2.35827C12.5903 1.88058 11.4097 1.88058 10.3754 2.35827L5.37545 4.66762C3.93093 5.33479 3 6.82344 3 8.46617V15.5338C3 17.1766 3.93094 18.6652 5.37545 19.3324L10.3754 21.6417C11.4097 22.1194 12.5903 22.1194 13.6246 21.6417L18.6246 19.3324C20.0691 18.6652 21 17.1766 21 15.5338V8.46617C21 6.82344 20.0691 5.33479 18.6246 4.66762Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11V22"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
}

export function BackspaceIcon(props: IconProps): JSX.Element {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.2799 20.25H16.9999C19.7599 20.25 21.9999 18.01 21.9999 15.25V8.75C21.9999 5.99 19.7599 3.75 16.9999 3.75H10.2799C8.86993 3.75 7.52993 4.34 6.57993 5.39L3.04993 9.27C1.63993 10.82 1.63993 13.18 3.04993 14.73L6.57993 18.61C7.52993 19.66 8.86993 20.25 10.2799 20.25Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.0001 14.47L11.0601 9.53003"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M11.0601 14.47L16.0001 9.53003"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </IconWrapper>
  );
}

export function HeartIcon(props: IconProps): JSX.Element {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.57378 3.52672L9 4.14317L8.42621 3.52672C6.84175 1.82443 4.27282 1.82443 2.68835 3.52671C1.10388 5.229 1.10388 7.98895 2.68835 9.69124L7.85243 15.2393C8.48621 15.9202 9.51379 15.9202 10.1476 15.2393L15.3116 9.69124C16.8961 7.98895 16.8961 5.229 15.3116 3.52672C13.7272 1.82443 11.1583 1.82443 9.57378 3.52672Z"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
}

export function ArrowDownIcon(props: IconProps): JSX.Element {
  return (
    <IconWrapper {...props}>
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.167 8.33325L10.0003 11.6666L5.83366 8.33325"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
}
