/* eslint-disable import/prefer-default-export */


export const findBounds = (polylines) => {
  // TODO: imporve this as some steop other than the first or last one might outisde
  //       the bounfign rect need to reduce the entire ploylines to find the most extremes points
  // DONE!

  // !!!!! assumptions we're allways above 0 for lat !!!!
  // !!!!! assumptions we're allways above 0 for lng !!!!

  /* eslint-disable no-param-reassign */
  const outterMostCardinalCoords = polylines.reduce((acc, polyline) => {
    const res = polyline.reduce((accu, [lng, lat]) => { // [lng, lat], somehow...
      if (lat >= accu.n) { accu.n = lat; }
      if (lat <= accu.s) { accu.s = lat; }
      if (lng >= accu.e) { accu.e = lng; }
      if (lng <= accu.w) { accu.w = lng; }

      return accu;
    }, {
      ...acc,
    });

    if (res.n >= acc.n) { acc.n = res.n; }
    if (res.s <= acc.s) { acc.s = res.s; }
    if (res.e >= acc.e) { acc.e = res.e; }
    if (res.w <= acc.w) { acc.w = res.w; }

    return acc;
  }, {
    n: 0, // lat
    e: 0, // lng
    s: Infinity, // lat
    w: Infinity, // lng
  });
  /* eslint-enable no-param-reassign */


  const orderedBounds = [
    [outterMostCardinalCoords.s, outterMostCardinalCoords.w],
    [outterMostCardinalCoords.n, outterMostCardinalCoords.e],
  ];

  // need to be under this form [[Southest,Westest], [Northest,Eastest]]
  return orderedBounds;
};
