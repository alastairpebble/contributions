function calculateAmount(time) {
  console.log("calculateAmount" + time);
  switch (time) {
    case "current":
      return 1234;
      break;
    case "future":
      console.log("5678");
      return 5678;
      break;
  }
  return 1234;
}

export default function calculate(state = 0, action) {
  console.log(action);
  switch (action.type) {
    case "CALCULATECURRENT":
      console.log(state);
      return calculateAmount("current");
      break;
    case "CALCULATEFUTURE":
      console.log(state);
      return calculateAmount("future");
      break;
    default:
      return state;
  }
}
