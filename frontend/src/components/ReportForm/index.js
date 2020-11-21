import React, { useState, useEffect } from "react";
import {
  FormTitle,
  Form,
  FormInput,
  FormLabel,
  FormSelect,
  FormOption,
  Submit,
} from "./styles";
import UserForm from "./UserForm";
import RepoForm from "./RepoForm";
import Attributes from "./Atributes";
import api from '../../services/api'

function ReportForm() {
  //Repo states
  const [name, setName] = useState("");
  const [table, setTable] = useState("Users");
  const [lang, setLang] = useState("");
  const [langList, setLangList] = useState([]);
  const [lic, setLic] = useState("");
  const [licList, setLicList] = useState([]);
  const [stars, setStars] = useState(0);
  const [forks, setForks] = useState(0);
  const [owner, setOwner] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attrList, setAttrList] = useState([]);

  //User States
  const [followers, setFollowers] = useState(0);
  const [repos, setRepos] = useState(0);
  const [type, setType] = useState("User");

  //const [repoquery, repoquerysetQuery] = useState({name ,table, lang, langList, lic, licList, stars, forks, owner, beginDate, endDate, attrList});
  //const

  useEffect(() => {
    setAttrList([]);
  }, [table]);

  const handleName = ({ target }) => {
    setName(target.value);
  };

  const handleTable = ({ target }) => {
    setTable(target.value);
  };

  const handleAttributes = ({ target }) => {
    if (!attrList.includes(target.innerText)) {
      setAttrList([...attrList, target.innerText]);
    } else {
      const newArray = attrList.filter((attr) => {
        return attr !== target.innerText;
      });
      setAttrList(newArray);
    }
  };

  const handleForm = async (event) => {
    event.preventDefault();
    //let query = "/users/report?attributes=[" + attrList.toString() + "]&&";
    const params = {};
    let response;
    console.log(table);
    if(table === "Users"){
      if(attrList.length>0) params.attributes = attrList;
      if (!!name) params.login = name;
      if (!!followers) params.followers = followers;
      if (!!type) params.type = type;
      if (!!repos) params.repos = repos;
      response = await api.get('/users/report', {
        params: params
      })
    }
    else{
      if(attrList.length>0) params.attributes = attrList;
      if(licList.length>0) params.licenses = licList;
      if(langList.length>0) params.languages = langList;
      if (!!name) params.full_name = name;
      if (!!forks) params.forks = forks;
      if (!!stars) params.stars = stars;
      if (!!beginDate) params.begin = beginDate;
      if (!!endDate) params.end = endDate;
      if (!!owner) params.owner = endDate;
      response = await api.get('/repositories/report', {
        params: params
      })
    }
    console.log(response);

  };

  const propsRepo = {
    lang: lang,
    setLang: setLang,
    langList: langList,
    setLangList: setLangList,
    stars: stars,
    setStars: setStars,
    forks: forks,
    setForks: setForks,
    lic: lic,
    setLic: setLic,
    licList: licList,
    setLicList: setLicList,
    owner: owner,
    setOwner: setOwner,
    beginDate: beginDate,
    endDate: endDate,
    setBeginDate: setBeginDate,
    setEndDate: setEndDate,
  };

  const propsUser = {
    followers: followers,
    setFollowers: setFollowers,
    repos: repos,
    setRepos: setRepos,
    type: type,
    setType: setType
  }

  // useEffect(()=>{console.log(table)},[table]);

  return (
    <>
      <Form>
      <FormTitle>Report Form</FormTitle>
        <FormLabel htmlFor="name">Name</FormLabel>
        <FormInput
          type="text"
          placeholder="name"
          id="name"
          value={name}
          onChange={handleName}
        />
        <FormLabel htmlFor="table">Table</FormLabel>
        <FormSelect
          id="table"
          value={table}
          onChange={handleTable}
          width="400px"
        >
          <FormOption value="Users">Users</FormOption>
          <FormOption value="Repositories">Repositories</FormOption>
        </FormSelect>
        {table === "Users" ? <UserForm {...propsUser} /> : <RepoForm {...propsRepo} />}
        <FormLabel>Attributes</FormLabel>
        <Attributes
          attrList={attrList}
          handleAttributes={handleAttributes}
          table={table}
        />
        <Submit onClick={handleForm}>Make a Report</Submit>
      </Form>
    </>
  );
}

export default ReportForm;
