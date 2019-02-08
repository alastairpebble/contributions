function calculateAmount(time) {
  console.log("calculateAmount" + time);
  switch (time) {
    case "current":
      return 1234;
      break;
    case "future":
      return 5678;
      break;
  }
  return 1234;
}

export default function calculate(state = 0, action) {
  console.log(action);
  switch (action.type) {
    case "CALCULATECURRENT":
      var amount = calculateAmount("current");
      console.log(state);
      console.log("amount" + amount);
      return amount;
      break;
    case "CALCULATEFUTURE":
      console.log(state);
      return calculateAmount("future");
      break;
    default:
      return state;
  }
}
