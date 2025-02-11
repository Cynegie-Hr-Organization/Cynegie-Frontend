import { ReactSVG } from "react-svg";

const SvgIcon: React.FC<{
  path: string;
  width: number;
  height: number;
}> = ({ path, width, height }) => {
  return (
    <ReactSVG
      src={path}
      beforeInjection={(svg) => {
        svg.setAttribute("style", `width:${width}px; height:${height}px`);
      }}
    />
  );
};

export default SvgIcon;
