const SeriesLabel: React.FC<{ label: string }> = ({ label }) => {
  return (
    <div style={{ color: "#70707A", fontWeight: 400, fontSize: "11.4px" }}>
      {label}
    </div>
  );
};

export default SeriesLabel;
