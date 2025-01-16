const DetailValue: React.FC<{
  value: string;
  wrapText?: boolean;
  required?: boolean;
}> = ({ value, wrapText = true, required = false }) => {
  return (
    <div
      style={{
        color: "#303030",
        fontWeight: 700,
        fontSize: "14px",
      }}
    >
      <pre
        style={{
          fontFamily: "Open Sans",
          textWrap: wrapText ? "wrap" : "nowrap",
        }}
      >
        {value}
        {required && <span style={{ color: "red" }}>*</span>}
      </pre>
    </div>
  );
};

export default DetailValue;
