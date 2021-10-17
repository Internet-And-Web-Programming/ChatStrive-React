//Using regular Expression for validation

var tempStore = "";
function Validate(data) {
  var err = "";
  if (data.value != undefined) {
    if (data.name == "Name") {
      if (data.value.length < 3) {
        err = "Name must be at least 3 characters long";
      }
      if (data.value.length > 15) {
        err = "Name must be less than 15 characters long";
      }
      if (!data.value.match(/^[a-zA-Z ]+$/)) {
        err = "Name must be alphabets only";
      }
    }
    if (data.name == "Username") {
      if (data.value.length < 3) {
        err = "Username must be at least 3 characters long";
      } else if (data.value.length > 15) {
        err = "Username must be less than 15 characters long";
      } else if (!data.value.match(/^[a-zA-Z0-9]+[._]*[a-zA-Z0-9]*$/)) {
        err =
          "Username must be alphanumeric only + Special Characters like '.' and '_' allowed in middle or in the end";
      }
    }

    if (data.name == "Password") {
      if (data.value.length < 6) {
        err = "Password must be at least 6 characters long";
      } else if (data.value.length > 15) {
        err = "Password must be less than 15 characters long";
      } else if (
        !data.value.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        )
      ) {
        err =
          "Password must be alphanumeric and must have atleast one special Character";
      }
      tempStore = data.value;
    }

    if (data.name == "Confirm Password") {
      if (data.value != tempStore) {
        err = "Password and Confirm Password must be same";
      }
    }

    if (data.name == "Email") {
      if (
        !data.value.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        )
      ) {
        err = "Email is invalid";
      }
    }
  }
  return err;
}

export default Validate;
