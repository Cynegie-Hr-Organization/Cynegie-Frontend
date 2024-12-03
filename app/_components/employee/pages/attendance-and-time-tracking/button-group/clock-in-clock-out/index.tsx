const ClockInClockOutButtons = () => {
  return (
    <>
      <button
        style={{
          borderRadius: '8px',
          border: '1.5px solid #98A2B3',
          color: '#475367',
          fontSize: '16px',
          fontWeight: 700,
          padding: '8px 20px',
        }}
      >
        Clock out
      </button>
      <button
        style={{
          borderRadius: '8px',
          border: '1.5px solid #98A2B3',
          color: '#FFFFFF',
          fontSize: '16px',
          fontWeight: 600,
          padding: '8px 20px',
          backgroundColor: '#0035C3',
        }}
      >
        Clock in
      </button>
    </>
  );
};

export default ClockInClockOutButtons;
