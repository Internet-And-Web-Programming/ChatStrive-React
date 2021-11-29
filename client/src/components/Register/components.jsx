const components = {
  Signin: [
    {
      placeholder: "Your Name",
      type: "text",
      name: "Name",
      id: "name",
    },
    {
      placeholder: "Set Username",
      name: "Username",
      type: "text",
      id: "username",
    },
    {
      placeholder: "Create Password",
      name: "Password",
      type: "password",
      id: "password",
    },
    {
      placeholder: "Confirm Password",
      name: "Confirm Password",
      type: "password",
      id: "cPassword",
    },
    {
      placeholder: "Email",
      name: "Email",
      type: "email",
      id: "email",
    },
    {
      placeholder: "Phone Number",
      name: "Phone Number",
      type: "number",
      id: "phone",
    },
  ],
  Login: [
    {
      placeholder: "Username",
      name: "Username",
      type: "text",
      id: "username",
    },
    {
      placeholder: "Password",
      name: "Password",
      type: "password",
      id: "password",
    },
  ],
  SigningIn: [
    {
      content: "Already a member ?",
      link: "Login",
      a: "./Login",
    },
  ],
  LoginingIn: [
    {
      content: "Not a member ?",
      link: "Signup",
      a: "./Signup",
    },
  ],
};

export default components;
