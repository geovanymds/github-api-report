import React, { useState, useEffect } from "react";
import GlobalStyle from "./styles/global";
import { Container } from "./styles.js";
import Header from "./components/Header";
import ReportForm from "./components/ReportForm";
import { GlobalStorage } from "./GlobalStorage";
import api from "./services/api";

function App() {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data } = await api.get("repositories/languages");
        setLanguages(data);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    fetchLanguages();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <GlobalStorage globals={{languages}}>
          <ReportForm />
        </GlobalStorage>
      </Container>
    </>
  );
}

export default App;
