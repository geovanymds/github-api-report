import React, { useState, useEffect } from "react";
import {
  FormTitle,
  Form,
  FormInput,
  FormLabel,
  FormSelect,
  FormOption,
} from "./styles";
import RepoForm from "./RepoForm";
import Attributes from "./Atributes";
import { Attribute } from "./Atributes/styles";

function ReportForm() {
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


  const handleName = ({ target }) => {
    setName(target.value);
  };

  const handleLang = ({ target }) => {
    setLang(target.value);
  };

  const handleTable = ({ target }) => {
    setTable(target.value);
  };

  const handleLic = ({ target }) => {
    setLic(target.value);
  };

  const handleOwner = ({ target }) => {
    setOwner(target.value);
  };

  const handleBeginDate = ({ target }) => {
    setBeginDate(target.value);
  };

  const handleEndDate = ({ target }) => {
    setEndDate(target.value);
  };

  const handleAttributes = ({ target }) => {
    
    if(!attrList.includes(target.innerText)) {
      setAttrList([...attrList, target.innerText]);
    } else {
      const newArray = attrList.filter((attr)=>{
        return attr !== target.innerText;
      })
      setAttrList(newArray);
    }  
  }

  // useEffect(()=>{console.log(attrList)},[attrList]);

  const propsRepo = {
    lang: lang,
    handleLang: handleLang,
    setLang: setLang,
    langList: langList,
    setLangList: setLangList,
    stars: stars,
    setStars: setStars,
    forks: forks,
    setForks: setForks,
    lic:lic,
    setLic:setLic,
    licList:licList,
    setLicList:setLicList,
    handleLic:handleLic,
    owner:owner,
    handleOwner:handleOwner,
    beginDate:beginDate,
    endDate:endDate,
    handleBeginDate:handleBeginDate,
    handleEndDate:handleEndDate
  };

  // useEffect(()=>{console.log(table)},[table]);

  return (
    <>
      <FormTitle>Report Form</FormTitle>
      <Form>
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
        <RepoForm
          {...propsRepo}
        />
        <FormLabel>Attributes</FormLabel>
        <Attributes attrList={attrList} handleAttributes={handleAttributes}/>
      </Form>
    </>
  );
}

export default ReportForm;
