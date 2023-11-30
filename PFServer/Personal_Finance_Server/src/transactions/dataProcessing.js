const monthsMapper = {
  1: "January",
  2: "Febraury",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

function preprocessMonth(data) {
  let monthsList = [];
  data.months.forEach((month) => {
    monthsList.push(monthsMapper[month]);
  });
  data.months = monthsList;
  return data;
}

function datapreprocess(unprocessedData) {
  let data = { months: [], totalEIS: [] };

  unprocessedData.forEach((item) => {
    data.months.push(parseInt(item.month));
    data.totalEIS.push(parseFloat(item.totaleis));
  });

  return data;
}

function computeSavings(incomeData, expenseData) {
  let savings = { months: [], totalEIS: [] };
  let i = 0;
  let j = 0;
  while (i < incomeData.months.length && j < expenseData.months.length) {
    if (incomeData.months[i] > expenseData.months[j]) {
      savings.months.push(expenseData.months[j]);
      savings.totalEIS.push(-1 * expenseData.totalEIS[j]);
      j += 1;
    } else if (incomeData.months[i] < expenseData.months[j]) {
      savings.months.push(incomeData.months[i]);
      savings.totalEIS.push(incomeData.totalEIS[i]);
      i += 1;
    } else {
      savings.months.push(incomeData.months[i]);
      savings.totalEIS.push(incomeData.totalEIS[i] - expenseData.totalEIS[j]);
      i += 1;
      j += 1;
    }
  }
  while (i < incomeData.months.length) {
    savings.months.push(incomeData.months[i]);
    savings.totalEIS.push(incomeData.totalEIS[i]);
    i += 1;
  }
  while (j < expenseData.months[j]) {
    savings.months.push(expenseData.months[j]);
    savings.totalEIS.push(-1 * expenseData.totalEIS[j]);
    j += 1;
  }
  return savings;
}

module.exports = {
  preprocessMonth,
  datapreprocess,
  computeSavings,
};
