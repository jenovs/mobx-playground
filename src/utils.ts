enum DeltaColor {
  negative = 'red',
  positive = 'green',
  zero = 'black',
}

export const formatTotal = (t: number) => {
  return t >= 1
    ? t.toFixed(2)
    : t > 0
      ? t.toFixed(8).replace(/0*$/, '')
      : '...';
};

export const formatDelta = (n: number): string => {
  if (!n) {
    return '';
  }

  const isWhole = Math.floor(n) === n;

  return isWhole ? n.toFixed(2) : n.toFixed(8).replace(/0*$/, '');
};

export const getColor = (delta: number, price: number): DeltaColor => {
  if (!delta || delta === price) {
    return DeltaColor.zero;
  }

  return delta > 0 ? DeltaColor.positive : DeltaColor.negative;
};
