import { data } from "../data";

function calculateAccumulation(time) {
  var personAgeCurrent = data.pension.person.ages.now;
  var personAgeRetirement = data.pension.person.ages.retirement;
  var personContributionsPersonal = data.pension.pot.now.contributions.personal;
  var personContributionsEmployer = data.pension.pot.now.contributions.employer;
  var pot = 0;
  data.pension.person.income.salary.annual.inflation =
    data.pension.person.income.salary.annual.now;

  switch (time) {
    case "now":
      personContributionsPersonal = data.pension.pot.now.contributions.personal;
      personContributionsEmployer = data.pension.pot.now.contributions.employer;
      break;
    case "future":
      personContributionsPersonal =
        data.pension.pot.future.contributions.personal;
      personContributionsEmployer =
        data.pension.pot.future.contributions.employer;
      break;
  }

  for (var i = personAgeCurrent; i < personAgeRetirement; i++) {
    pot +=
      data.pension.person.income.salary.annual.inflation *
      personContributionsPersonal;
    //console.log( (data.pension.person.income.salary.annual.inflation * personContributionsPersonal) );
    pot +=
      data.pension.person.income.salary.annual.inflation *
      personContributionsEmployer;
    pot += pot * data.pension.rates.pension.interest;
    pot += pot * data.pension.rates.pension.fees.annual;
    pot += pot * data.pension.rates.government.inflation;

    //console.log("salary" + data.pension.person.income.salary.annual );

    data.pension.person.income.salary.annual.inflation +=
      data.pension.person.income.salary.annual.inflation * 0.028;

    //console.log("pot" + "year: " + i + " amount:" + pot);
  }

  pot = Math.ceil(pot / 10) * 10;

  if (time == "now") {
    return pot;
    return 67145;
  }

  if (time == "future") {
    return pot;
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

function calculateAmount(time) {
  console.log("calculateAmount" + time);
  switch (time) {
    case "current":
      console.log("current");
      return {
        percentage:
          data.personas[0].pensions.pot.now.contributions.personal * 100,
        percentage_increase: 0,
        number: 106310,
        income: {
          monthly: 123,
          for: {
            years: 15
          }
        }
      };
      break;
    case "future":
      return {
        percentage:
          data.personas[0].pensions.pot.future.contributions.personal * 100,
        percentage_increase: 1,
        number: 116940,
        income: {
          monthly: 456,
          for: {
            years: 15
          }
        }
      };
      break;
    case "superfuture":
      return {
        percentage:
          data.personas[0].pensions.pot.superfuture.contributions.personal *
          100,
        percentage_increase: 2,
        number: 127570,
        income: {
          monthly: 789,
          for: {
            years: 15
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
