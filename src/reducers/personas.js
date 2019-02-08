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

const persona = {
  firstname: "Ali",
  lastname: "Driver"
};

const personaB = {
  firstname: "Billy",
  lastname: "No Mates"
};

export default function personas(state = 0, action) {
  //console.log(action);

  switch (action.type) {
    case "CALCULATECURRENTA":
      //console.log(state);
      return calculateAmount("current");
      break;
    case "CURRENTPERSONA":
      //console.log(persona);
      return 0;
      break;
    case "NEWPERSONA":
      console.log(personaB);
      return 1;
      break;
    default:
      return persona;
  }
}
