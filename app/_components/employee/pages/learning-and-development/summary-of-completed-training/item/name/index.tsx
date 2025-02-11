const Name: React.FC<{ text: string }> = ({ text }) => {
  return (
    <span style={{ color: "#101928", fontWeight: 600, fontSize: "14px" }}>
      {text}
    </span>
  );
};

export default Name;
