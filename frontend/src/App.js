import React from "react";
import GlobalStyle from "./styles/global";
import { Container } from "./styles.js";
import Header from "./components/Header";
import ReportForm from "./components/ReportForm";

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header/>
        <ReportForm />
      </Container>
    </>
  );
}

export default App;
