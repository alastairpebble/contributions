import { data } from "../data";

function calculateAccumulation(time) {
  var personAgeCurrent = data.personas[0].pensions.person.ages.now;
  var personAgeRetirement = data.personas[0].pensions.person.ages.retirement;
  var personContributionsPersonal =
    data.personas[0].pensions.pot.now.contributions.personal;
  var personContributionsEmployer =
    data.personas[0].pensions.pot.now.contributions.employer;
  var pot = 0;
  data.personas[0].pensions.person.income.salary.annual.inflation =
    data.personas[0].pensions.person.income.salary.annual.current;

  data.personas[0].pensions.pot.now.contributions.amount.personal = Math.round(
    (data.personas[0].pensions.person.income.salary.annual.current *
      data.personas[0].pensions.pot.now.contributions.personal) /
      12
  );
  data.personas[0].pensions.pot.future.contributions.amount.personal = Math.round(
    (data.personas[0].pensions.person.income.salary.annual.current *
      data.personas[0].pensions.pot.future.contributions.personal) /
      12
  );
  data.personas[0].pensions.pot.superfuture.contributions.amount.personal = Math.round(
    (data.personas[0].pensions.person.income.salary.annual.current *
      data.personas[0].pensions.pot.superfuture.contributions.personal) /
      12
  );

  switch (time) {
    case "now":
      personContributionsPersonal = parseFloat(
        data.personas[0].pensions.pot.now.contributions.personal
      );
      personContributionsEmployer = parseFloat(
        data.personas[0].pensions.pot.now.contributions.employer
      );
      break;
    case "future":
      personContributionsPersonal =
        data.personas[0].pensions.pot.future.contributions.personal;
      personContributionsEmployer =
        data.personas[0].pensions.pot.future.contributions.employer;
      break;
    case "superfuture":
      personContributionsPersonal =
        data.personas[0].pensions.pot.superfuture.contributions.personal;
      personContributionsEmployer =
        data.personas[0].pensions.pot.superfuture.contributions.employer;
      break;
  }

  let todaysMoneyReducer =
    1 + data.personas[0].pensions.rates.government.inflation;
  let todaysMoneyReducerTime = todaysMoneyReducer;

  for (var i = personAgeCurrent; i < personAgeRetirement; i++) {
    todaysMoneyReducerTime = todaysMoneyReducerTime * todaysMoneyReducer;
    console.log("todaysMoneyReducerTime" + todaysMoneyReducerTime);
    pot +=
      parseInt(
        data.personas[0].pensions.person.income.salary.annual.inflation
      ) * personContributionsPersonal;

    pot +=
      data.personas[0].pensions.person.income.salary.annual.inflation *
      personContributionsEmployer;
    pot += pot * data.personas[0].pensions.rates.pension.interest;
    pot += pot * data.personas[0].pensions.rates.pension.fees.annual;
    pot += pot * data.personas[0].pensions.rates.government.inflation;

    data.personas[0].pensions.person.income.salary.annual.inflation +=
      data.personas[0].pensions.person.income.salary.annual.inflation * 0.028;
  }

  let potToday = pot * todaysMoneyReducerTime;
  //pot = Math.ceil(pot / 10) * 10;

  pot = Math.ceil(potToday / 1000) * 1000;

  if (time == "now") {
    return {
      pot: pot,
      income: data.personas[0].pensions.person.income.salary.annual.current
    };
  }

  if (time == "future") {
    return {
      pot: pot,
      income: data.personas[0].pensions.person.income.salary.annual.current
    };
  }

  if (time == "superfuture") {
    return {
      pot: pot,
      income: data.personas[0].pensions.person.income.salary.annual.current
    };
  }
}

function calculateDecumulation(accumulation) {
  var potSize = accumulation.pot;
  var potSizeDecumulation = potSize;
  var annualIncomeNeeded = accumulation.income * 0.65;
  var monthlyIncomeNeeded = annualIncomeNeeded / 12;
  var forYears = 0;
  var forMonths = 0;

  var annuity = potSize * 0.05;
  var annuityMonthly = annuity / 12;
  annuityMonthly = Math.ceil(annuityMonthly / 10) * 10;

  return {
    monthly: Math.round(annuityMonthly),
    for: {
      years: 25,
      months: 0,
      monthsRemainder: 0
    }
  };

  for (
    let year = data.personas[0].pensions.person.ages.retirement;
    year <= data.personas[0].pensions.person.ages.until;
    year++
  ) {
    for (var i = 0; i < 12; i++) {
      potSizeDecumulation -= monthlyIncomeNeeded;

      if (potSizeDecumulation < 0) {
        var monthsRemainder = forMonths - forYears * 12;
        return {
          monthly: Math.round(monthlyIncomeNeeded),
          for: {
            years: forYears,
            months: forMonths,
            monthsRemainder: monthsRemainder
          }
        };
      }

      forMonths++;
    }

    forYears++;
  }

  return {
    monthly: Math.round(monthlyIncomeNeeded),
    for: {
      years: forYears
    }
  };
}

function calculateAmount(time) {
  switch (time) {
    case "current":
      var accumulation = calculateAccumulation("now");
      var decumulation = calculateDecumulation(accumulation);
      return {
        percentage:
          data.personas[0].pensions.pot.now.contributions.personal * 100,
        percentage_employer:
          data.personas[0].pensions.pot.now.contributions.employer * 100,
        percentage_increase: 0,
        number: accumulation.pot,
        income: {
          monthly: decumulation.monthly,
          for: {
            years: decumulation.for.years,
            months: decumulation.for.monthsRemainder
          }
        }
      };
      break;
    case "future":
      var accumulation = calculateAccumulation("future");
      var decumulation = calculateDecumulation(accumulation);

      return {
        percentage:
          data.personas[0].pensions.pot.future.contributions.personal * 100,
        percentage_employer:
          data.personas[0].pensions.pot.future.contributions.employer * 100,
        percentage_increase: 1,
        number: accumulation.pot,
        income: {
          monthly: decumulation.monthly,
          for: {
            years: decumulation.for.years,
            months: decumulation.for.monthsRemainder
          }
        }
      };
      break;
    case "superfuture":
      var accumulation = calculateAccumulation("superfuture");
      var decumulation = calculateDecumulation(accumulation);

      return {
        percentage:
          data.personas[0].pensions.pot.superfuture.contributions.personal *
          100,
        percentage_employer:
          data.personas[0].pensions.pot.superfuture.contributions.employer *
          100,
        percentage_increase: 2,
        number: accumulation.pot,
        income: {
          monthly: decumulation.monthly,
          for: {
            years: decumulation.for.years,
            months: decumulation.for.monthsRemainder
          }
        }
      };
      break;
  }
}

export default function calculate(state = 0, action) {
  switch (action.type) {
    case "CALCULATECURRENT":
      var amount = calculateAmount("current");
      return amount;
      break;
    case "CALCULATEFUTURE":
      return calculateAmount("future");
      break;
    case "CALCULATESUPERFUTURE":
      return calculateAmount("superfuture");
      break;

    default:
      return state;
  }
}
