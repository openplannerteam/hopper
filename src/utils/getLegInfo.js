export default function getLegInfo(legs) {
  // TODO: Use switch case
  // TODO: Fallback to default color (black?) when no match

  if (!legs) return undefined;
  const legInfo = legs.map((leg) => {
    if (leg.mode === 'WALK') {
      return {
        legColor: '000000',
        legMode: leg.mode,
      };
    }
    if (leg.mode === 'BICYCLE' || leg.mode === 'EBIKE') {
      return {
        legColor: '40E16E',
        legMode: leg.mode,
      };
    }
    if (leg.mode === 'TRAIN') {
      return {
        legColor: '0068B6',
        legMode: leg.mode,
      };
    }
    return {
      legColor: leg.routeColor,
      legMode: leg.mode,
    };
  });

  return legInfo;
}
