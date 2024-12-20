const Icon = ({
  width = 24,
  height = 24,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 100"
    >
      <g clipPath="url(#a)" filter="url(#b)">
        <mask
          id="c"
          width="100"
          height="100"
          x="0"
          y="0"
          //   maskType="alpha"
          maskUnits="userSpaceOnUse"
        >
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M70.912 99.572a6.193 6.193 0 0 0 4.96-.191l20.588-9.958a6.285 6.285 0 0 0 3.54-5.661V16.239a6.286 6.286 0 0 0-3.54-5.662L75.873.62a6.2 6.2 0 0 0-7.104 1.216L29.355 37.98l-17.168-13.1a4.146 4.146 0 0 0-5.318.238l-5.506 5.035a4.205 4.205 0 0 0-.004 6.194L16.247 50 1.36 63.654a4.205 4.205 0 0 0 .004 6.194l5.506 5.034a4.145 4.145 0 0 0 5.318.238l17.168-13.1L68.77 98.166a6.205 6.205 0 0 0 2.143 1.407Zm4.103-72.39L45.11 50 75.015 72.82V27.18Z"
            clipRule="evenodd"
          />
        </mask>
        <g mask="url(#c)">
          <path
            fill="#D9D9D9"
            d="M96.461 10.593 75.857.621a6.205 6.205 0 0 0-7.107 1.214L1.298 63.654a4.203 4.203 0 0 0 .005 6.194l5.51 5.034a4.15 4.15 0 0 0 5.32.238L93.36 13.18c2.725-2.078 6.64-.124 6.64 3.314v-.24a6.287 6.287 0 0 0-3.539-5.661Z"
          />
          <g filter="url(#d)">
            <path
              fill="#E6E6E6"
              d="M96.461 89.407 75.857 99.38a6.205 6.205 0 0 1-7.107-1.215L1.298 36.346a4.203 4.203 0 0 1 .005-6.194l5.51-5.034a4.15 4.15 0 0 1 5.32-.238L93.36 86.82c2.725 2.079 6.64.125 6.64-3.314v.241a6.287 6.287 0 0 1-3.539 5.66Z"
            />
          </g>
          <g filter="url(#e)">
            <path
              fill="#fff"
              d="M75.858 99.38a6.206 6.206 0 0 1-7.108-1.215c2.306 2.318 6.25.676 6.25-2.602V4.437c0-3.278-3.944-4.92-6.25-2.602A6.208 6.208 0 0 1 75.858.619l20.6 9.958A6.286 6.286 0 0 1 100 16.24v67.523a6.286 6.286 0 0 1-3.542 5.661l-20.6 9.958Z"
            />
          </g>
          <path
            fill="url(#f)"
            fillRule="evenodd"
            d="M70.85 99.572a6.193 6.193 0 0 0 4.962-.191L96.4 89.423a6.284 6.284 0 0 0 3.539-5.661V16.239a6.285 6.285 0 0 0-3.539-5.662L75.811.62a6.2 6.2 0 0 0-7.103 1.216L29.294 37.98l-17.168-13.1a4.146 4.146 0 0 0-5.318.238l-5.506 5.034a4.205 4.205 0 0 0-.004 6.194L16.186 50 1.297 63.654a4.205 4.205 0 0 0 .005 6.194l5.506 5.034a4.146 4.146 0 0 0 5.318.238l17.168-13.1 39.414 36.145a6.205 6.205 0 0 0 2.143 1.407Zm4.104-72.39L45.048 50l29.906 22.819V27.18Z"
            clipRule="evenodd"
            opacity=".25"
            style={{ mixBlendMode: "overlay" }}
          />
        </g>
      </g>
      <defs>
        <filter
          id="b"
          width="112.5"
          height="112.5"
          x="-6.25"
          y="-4.167"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="2.083" />
          <feGaussianBlur stdDeviation="3.125" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="d"
          width="116.728"
          height="92.638"
          x="-8.394"
          y="15.695"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4.167" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            mode="overlay"
            result="effect1_dropShadow"
          />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="e"
          width="47.917"
          height="116.667"
          x="60.417"
          y="-8.333"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4.167" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            mode="overlay"
            result="effect1_dropShadow"
          />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <linearGradient
          id="f"
          x1="49.939"
          x2="49.939"
          y1="0"
          y2="100.001"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h100v100H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Icon;
