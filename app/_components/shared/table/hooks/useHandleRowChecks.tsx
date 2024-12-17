'use client';
import { useState } from 'react';

const useHandleRowChecks = <T,>() => {
  const [checkedRows, setCheckedRows] = useState<T[]>([]);
  const [clearChecks, setClearChecks] = useState(false);
  const resetChecks = () => {
    setClearChecks(!clearChecks);
    setCheckedRows([]);
  };
  return {
    checkedRows,
    setCheckedRows,
    clearChecks,
    resetChecks,
  };
};

export default useHandleRowChecks;
