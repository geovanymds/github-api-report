import React, { useState } from "react";
import { FormTitle, Form, FormInput, FormLabel, FormSelect, FormOption } from "./styles";

function ReportForm() {
  const [name, setName] = useState("");

  const handleChange = ({ target }) => {
    setName(target.value);
  };

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
          onChange={handleChange}
        />
        <FormLabel htmlFor="table">Table</FormLabel>
        <FormSelect id="table">
          <FormOption value="">Selecione</FormOption>
          <FormOption value="Users">Users</FormOption>
          <FormOption value="Repositories">Repositories</FormOption>
        </FormSelect>
      </Form>
    </>
  );
}

export default ReportForm;
