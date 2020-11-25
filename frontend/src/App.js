import React, { useState, useEffect } from "react";
import GlobalStyle from "./styles/global";
import { Container, SubContainerTable } from "./styles.js";
import Header from "./components/Header";
import ReportForm from "./components/ReportForm";
import { GlobalStorage } from "./GlobalStorage";
import Result from "./components/Result";
import api from "./services/api";

function App() {
  const [languages, setLanguages] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [attrRepos, setAttrRepos] = useState([]);
  const [attrUser, setAttrUser] = useState([]);
  const [response, setResponse] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRepos, setTotalRepos] = useState(0);
  const [params, setParams] = useState({});

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data } = await api.get("repositories/main");
        setLanguages(data.languages);
        setLicenses(data.licenses);
        setAttrRepos(data.attributes.repos);
        setAttrUser(data.attributes.user);
        setTotalUsers(data.totalUsers);
        setTotalRepos(data.totalRepos);
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
      <GlobalStorage
        globals={{
          languages,
          licenses,
          attrRepos,
          attrUser,
          response,
          setResponse,
          params,
          setParams,
          totalUsers,
          totalRepos
        }}
      >
        <Container>
          <ReportForm />
          <SubContainerTable>
          {response.length > 0 && <Result />}
          </SubContainerTable>  
        </Container>
      </GlobalStorage>
    </>
  );
}

export default App;
