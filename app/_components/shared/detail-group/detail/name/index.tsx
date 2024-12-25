const DetailName: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div
      style={{
        color: "#9CA3AF",
        fontWeight: 400,
        fontSize: "14px",
      }}
    >
      {name}
    </div>
  );
};

export default DetailName;
