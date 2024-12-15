type DotProps = {
  width: number;
  height: number;
  color?: string;
};

const Dot: React.FC<DotProps> = (props) => {
  const { width, height, color } = props;
  return (
    <div
      className={`rounded-full`}
      style={{ width: width, height: height, backgroundColor: color }}
    ></div>
  );
};

export default Dot;
