const SeriesValue: React.FC<{ value: number | string }> = ({ value }) => {
  return (
    <div style={{ color: "#0A112F", fontWeight: 500, fontSize: "19.53px" }}>
      {value}
    </div>
  );
};

export default SeriesValue;
