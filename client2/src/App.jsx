import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./Theme";
import Home from "./Components/1HomePage/Home";
import Login from "./Components/2Credentials/1LoginPage/Login";
import Signup from "./Components/2Credentials/2SignUpPage/Signin";
import Chat from "./Components/4MainChattingWindow/Chat";
import ContactUs from "./Components/5QueryPage/Query";

const StyledApp = styled.div``;
const positioning = {
  height: "100%",
};

const buttonStyle = {
  borderRadius: "10px",
  border: "none",
  padding: "5px",
  alignSelf: "flex-end",
};

function App() {
  const [theme, setTheme] = useState("light");

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="App" style={positioning}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <StyledApp>
          <button onClick={() => changeTheme()} style={buttonStyle}>
            ChangeTheme
          </button>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/Signin" component={Signup} />
              <Route exact path="/Chat" component={Chat} />
              <Route exact path="/ContactUs" component={ContactUs} />
              {/* <Route path = "/" component ={}/> */}
            </Switch>
          </BrowserRouter>
        </StyledApp>
      </ThemeProvider>
    </div>
  );
}

export default App;
