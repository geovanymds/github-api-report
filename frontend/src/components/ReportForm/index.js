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

function ReportForm() {
  const [name, setName] = useState("");
  const [table, setTable] = useState("Users");
  const [lang, setLang] = useState("");
  const [langList, setLangList] = useState([]);
  const [stars, setStars] = useState(0);
  const [forks, setForks] = useState(0);

  const handleName = ({ target }) => {
    setName(target.value);
  };

  const handleLang = ({ target }) => {
    setLang(target.value);
  };

  const handleTable = ({ target }) => {
    setTable(target.value);
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
          lang={lang}
          handleLang={handleLang}
          setLang={setLang}
          langList={langList}
          setLangList={setLangList}
          stars={stars}
          setStars={setStars}
          forks={forks}
          setForks={setForks}
        />
        {/* <FormLabel htmlFor="languages">Languages</FormLabel>
        <FormInput list="languagesOptions" value={lang} onChange={handleLang} placeholder="Select a Language" width="200px"/>
        <DataList id="languagesOptions">
          {globals.languages.map((language) => (
            <FormOption key={language} value={language}>{language}</FormOption>
          ))}
        </DataList> */}
      </Form>
    </>
  );
}

export default ReportForm;
