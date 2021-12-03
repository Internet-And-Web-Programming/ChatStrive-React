const loggedIn = (state = false, data, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return data;
  }
};
export default loggedIn;
