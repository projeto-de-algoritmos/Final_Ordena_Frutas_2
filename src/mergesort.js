function merge(left, right) {
  let sortedArr = [];
  while (left.length && right.length) {
    console.log(left[0], right[0])
    if (left[0].carbohydrates < right[0].carbohydrates) {
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
    }
  }
  return [...sortedArr, ...left, ...right];
}

export function mergeSort(arr) {
  const half = arr.length / 2;
  if (arr.length <= 1) {
    return arr;
  }
  const left = arr.splice(0, half);
  const right = arr;
  return merge(mergeSort(left), mergeSort(right));
}