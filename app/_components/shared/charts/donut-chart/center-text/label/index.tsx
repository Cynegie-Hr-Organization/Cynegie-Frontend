const CenterTextLabel: React.FC<{ label: string }> = ({ label }) => {
  return (
    <div style={{ color: '#475367', fontWeight: 400, fontSize: '12px' }}>
      {label}
    </div>
  );
};

export default CenterTextLabel;
