export const knapsack = (items, capacity) => {
  var memo = [];

  for (var i = 0; i < items.length; i++) {
    var row = [];
    for (var subCapacity = 1; subCapacity <= capacity; subCapacity++) {
      row.push(getSolution(i, subCapacity));
    }
    memo.push(row);
  }

  return getLast();

  function getLast() {
    var lastRow = memo[memo.length - 1];
    return lastRow[lastRow.length - 1];
  }

  function getSolution(row, cap) {
    const without_solution = { maxValue: 0, subset: [] };

    var column = cap - 1;
    var lastItem = items[row];

    var remaining = cap - lastItem.carbohydrates;

    var lastSolution =
      row > 0 ? memo[row - 1][column] || without_solution : without_solution;

    var lastSubSolution =
      row > 0
        ? memo[row - 1][remaining - 1] || without_solution
        : without_solution;

    if (remaining < 0) {
      return lastSolution;
    }

    var lastValue = lastSolution.maxValue;
    var lastSubValue = lastSubSolution.maxValue;
    var newValue = lastSubValue + lastItem.carbohydrates;

    if (newValue >= lastValue) {
      var _lastSubSet = lastSubSolution.subset.slice();

      _lastSubSet.push(lastItem);

      return { maxValue: newValue, subset: _lastSubSet };
    } else {
      return lastSolution;
    }
  }
};
