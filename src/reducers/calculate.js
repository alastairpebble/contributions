import { data } from "../data";

function calculateAccumulation(time) {
  //data.personas[0].pensions.pot.now.contributions.personal
  var personAgeCurrent = data.personas[0].pensions.person.ages.now;
  var personAgeRetirement = data.personas[0].pensions.person.ages.retirement;
  var personContributionsPersonal =
    data.personas[0].pensions.pot.now.contributions.personal;
  var personContributionsEmployer =
    data.personas[0].pensions.pot.now.contributions.employer;
  var pot = 0;
  data.personas[0].pensions.person.income.salary.annual.inflation =
    data.personas[0].pensions.person.income.salary.annual.current;

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

  for (var i = personAgeCurrent; i < personAgeRetirement; i++) {
    pot +=
      parseInt(
        data.personas[0].pensions.person.income.salary.annual.inflation
      ) * personContributionsPersonal;
    console.log(
      parseInt(data.personas[0].pensions.person.income.salary.annual.inflation)
    );

    //console.log( (data.pension.person.income.salary.annual.inflation * personContributionsPersonal) );
    pot +=
      data.personas[0].pensions.person.income.salary.annual.inflation *
      personContributionsEmployer;
    pot += pot * data.personas[0].pensions.rates.pension.interest;
    pot += pot * data.personas[0].pensions.rates.pension.fees.annual;
    pot += pot * data.personas[0].pensions.rates.government.inflation;

    //console.log("salary" + data.pension.person.income.salary.annual );

    data.personas[0].pensions.person.income.salary.annual.inflation +=
      data.personas[0].pensions.person.income.salary.annual.inflation * 0.028;

    //console.log("pot" + "year: " + i + " amount:" + pot);
  }

  pot = Math.ceil(pot / 10) * 10;

  if (time == "now") {
    //console.log("POT" + pot);
    return {
      pot: pot,
      income: data.personas[0].pensions.person.income.salary.annual.inflation
    };
    return 67145;
  }

  if (time == "future") {
    return {
      pot: pot,
      income: data.personas[0].pensions.person.income.salary.annual.inflation
    };
    return 88989;
  }

  if (time == "superfuture") {
    return {
      pot: pot,
      income: data.personas[0].pensions.person.income.salary.annual.inflation
    };
    return 88989;
  }

  /*
  if(percentage == 0.05) {
    return 67145;
  }

  if(percentage == 0.06) {
    return 88989;
  }
  */
}

function calculateDecumulation(accumulation) {
  var potSize = accumulation.pot;
  var potSizeDecumulation = potSize;
  var annualIncomeNeeded = accumulation.income * 0.65;
  var monthlyIncomeNeeded = annualIncomeNeeded / 12;
  var forYears = 0;
  var forMonths = 0;
  // data.personas[0].pensions.person.income.salary.annual.inflation

  for (
    let year = data.personas[0].pensions.person.ages.retirement;
    year <= data.personas[0].pensions.person.ages.until;
    year++
  ) {
    //console.log("incomeNeeded" + annualIncomeNeeded);
    //console.log(year);

    for (var i = 0; i < 12; i++) {
      potSizeDecumulation -= monthlyIncomeNeeded;
      //console.log(potSizeDecumulation);

      if (potSizeDecumulation < 0) {
        //forYears = (forMonths / 12);
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
  //console.log("calculateAmount" + time);
  switch (time) {
    case "current":
      var accumulation = calculateAccumulation("now");
      var decumulation = calculateDecumulation(accumulation);
      //console.log("decumulation");
      //console.log(decumulation);
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
      //console.log("future" + accumulation);
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
      //console.log("superfuture" + accumulation);
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
  return 1234;
}

export default function calculate(state = 0, action) {
  console.log("export default function calculate");
  console.log(action);
  switch (action.type) {
    case "CALCULATECURRENT":
      var amount = calculateAmount("current");
      console.log("CALCULATECURRENT");
      console.log(state);
      console.log("data");
      console.log(action);
      console.log("amount" + amount);
      return amount;
      break;
    case "CALCULATEFUTURE":
      console.log(state);
      return calculateAmount("future");
      break;
    case "CALCULATESUPERFUTURE":
      console.log(state);
      return calculateAmount("superfuture");
      break;

    default:
      return state;
  }
}
