export const transformToArray = (
  object: object,
  keyMatch1: string,
  keyMatch2: string,
  finalKey1: string,
  finalKey2: string,
  toNumber?: boolean,
) => {
  const allKeys = Object.keys(object);
  const allValues = Object.values(object);

  const keySet1 = Object.keys(object).filter(
    (key) => key.match(keyMatch1) && key,
  );

  const keySet2 = Object.keys(object).filter(
    (key) => key.match(keyMatch2) && key,
  );

  const indexSet1 = keySet1.map((key) => allKeys.indexOf(key));
  const indexSet2 = keySet2.map((key) => allKeys.indexOf(key));

  const valueSet1 = indexSet1.map((index) => allValues[index]);
  const valueSet2 = indexSet2.map((index) => allValues[index]);

  const transformedArray = valueSet1.map((value, index) => ({
    [`${finalKey1}`]: value,
    [`${finalKey2}`]: toNumber ? Number(valueSet2[index]) : valueSet2[index],
  }));

  return transformedArray;
};
