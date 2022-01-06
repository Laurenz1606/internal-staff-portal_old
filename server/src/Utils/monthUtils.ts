function getMonthID(timestamp: number) {
  const date = new Date(timestamp);

  return `${date.getFullYear()}-${date.getMonth()}`;
}

function getMonthsFromX(monthID: string, monthsFromNow: number) {
  //get the numbers from the id
  const year = parseInt(monthID.slice(0, 4));
  const month = parseInt(monthID.replace(/\d\d\d\d-/, ""));

  //calculate the months from now and years from now
  const yearsFromNow = Math.floor(monthsFromNow / 12);
  monthsFromNow = (12 + (monthsFromNow % 12)) % 12;

  //format the new Date
  return `${year + yearsFromNow}-${month + monthsFromNow}`;
}
