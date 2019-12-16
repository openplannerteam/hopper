export default function removeDuplicates(array, comp) {
  const unique = array
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => array[e]).map(e => array[e]);
  return unique;
}
