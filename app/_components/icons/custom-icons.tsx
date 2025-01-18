import { SVGProps } from "react";



export const DeleteSvg = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" rx="50" fill="#FBEAE9" />
      <rect x="7" y="7" width="86" height="86" rx="43" fill="#EB9B98" />
      <g opacity="0.7">
        <rect x="15" y="17" width="70" height="70" rx="35" fill="#D42620" />
        <path
          d="M40.9266 40.3329C40.2106 39.617 39.0498 39.617 38.3338 40.3329C37.6179 41.0489 37.6179 42.2097 38.3338 42.9257L47.4084 52.0002L38.3338 61.0747C37.6179 61.7907 37.6179 62.9515 38.3338 63.6675C39.0498 64.3834 40.2106 64.3834 40.9266 63.6675L50.0011 54.5929L59.0756 63.6675C59.7916 64.3834 60.9524 64.3834 61.6684 63.6675C62.3843 62.9515 62.3843 61.7907 61.6684 61.0747L52.5938 52.0002L61.6684 42.9257C62.3843 42.2097 62.3843 41.0489 61.6684 40.3329C60.9524 39.617 59.7916 39.617 59.0756 40.3329L50.0011 49.4075L40.9266 40.3329Z"
          fill="white"
        />
      </g>
    </svg>
  );
};



export const SuccessSvg = (props: SVGProps<SVGSVGElement>) => (
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
