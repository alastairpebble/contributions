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
    case "GETPERSONAS":
      return persona;
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
