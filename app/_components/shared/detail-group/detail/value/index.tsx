const DetailValue: React.FC<{ value: string; wrapText?: boolean }> = ({
  value,
  wrapText = true,
}) => {
  return (
    <div
      style={{
        color: '#303030',
        fontWeight: 700,
        fontSize: '14px',
      }}
    >
      <pre
        style={{
          fontFamily: 'Open Sans',
          textWrap: wrapText ? 'wrap' : 'nowrap',
        }}
      >
        {value}
      </pre>
    </div>
  );
};

export default DetailValue;
