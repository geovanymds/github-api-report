import React from "react";
import ReportForm from "./components/ReportForm";
import GlobalStyle from "./styles/global";
import { Container } from "./styles.js";
import Header from "./components/Header";

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
