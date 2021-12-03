import React from "react";
import Register from "./components/Register/Register";
import Chat from "./components/Chat/chatApp";
import Home from "./components/Home/Home";
import NewRegister from "./components/Register/NewRegister";
import ContactUs from "./components/ContactUs/ContactUs";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { lightTheme, darkTheme, GlobalStyles } from "./Theme";
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
function App() {
  const [theme, setTheme] = useState("light");

  // const changeTheme = () => {
  //   if (theme === "light") {
  //     setTheme("dark");
  //   } else {
  //     setTheme("light");
  //   }
  // };

  const StyledApp = styled.div``;

  const positioning = {
    height: "100%",
  };

  return (
    <div className="App" style={positioning}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <StyledApp>
          <Router>
            <Route exact path="/" component={Home} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/chat" component={() => <Chat status={[]} />} />
            <Route exact path="/NewRegister" component={NewRegister} />
            <Route exact path="/ContactUs" component={ContactUs} />
          </Router>
        </StyledApp>
      </ThemeProvider>
    </div>
  );
}

export default App;
