const Period: React.FC<{
  text: string;
  font?: { size: number; weight: number; color: string };
}> = ({ text, font }) => {
  return (
    <div
      style={{
        color: font?.color ? font.color : '#98A2B3',
        fontSize: font?.size ? font.size : '12px',
        fontWeight: font?.weight ? font.weight : 400,
      }}
    >
      {text}
    </div>
  );
};

export default Period;
