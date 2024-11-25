import { SVGProps } from "react";

const SuccessSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={101}
    height={100}
    viewBox="0 0 101 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} width={100} height={100} rx={50} fill="#E6EBF9" />
    <rect x={7.5} y={7} width={86} height={86} rx={43} fill="#B0C0EC" />
    <g opacity={0.7}>
      <rect x={15.5} y={17} width={70} height={70} rx={35} fill="#335DCF" />
    </g>
    <path
      d="M28.2107 46.1283C24.8571 45.2684 25.3086 47.6331 25.9535 48.9229L42.5061 65.3681C46.6335 69.5815 49.3851 67.1237 50.245 65.3681L56.6941 53.8673C66.8406 35.7238 80.1258 21.7293 85.5 17C80.2332 18.3973 51.6423 40.3242 44.0109 53.8673L28.2107 46.1283Z"
      fill="white"
      stroke="white"
      strokeWidth={0.21497}
    />
  </svg>
);
export default SuccessSvg;
