import React, { useState, useEffect } from "react";
import GlobalStyle from "./styles/global";
import { Container, SubContainer } from "./styles.js";
import Header from "./components/Header";
import ReportForm from "./components/ReportForm";
import { GlobalStorage } from "./GlobalStorage";
import api from "./services/api";

function App() {
  const [languages, setLanguages] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [attrRepos, setAttrRepos] = useState([]);
  const [attrUser, setAttrUser] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data } = await api.get("repositories/main");
        setLanguages(data.languages);
        setLicenses(data.licenses);
        setAttrRepos(data.attributes.repos);
        setAttrUser(data.attributes.user);
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
      <Header />
      <Container>
        <SubContainer>
          <GlobalStorage globals={{ languages, licenses, attrRepos, attrUser }}>
            <ReportForm />
          </GlobalStorage>
        </SubContainer>
      </Container>
    </>
  );
}

export default App;
