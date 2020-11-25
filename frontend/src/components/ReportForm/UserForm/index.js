import React from "react";
import { FormLabel, FormInput, FormSelect, FormOption } from "../styles";
import { Container, InputContainer } from "./styles";

function UserForm(props) {

  const handleFollowers = ({ target }) => {
    props.setFollowers(target.value);
  }

  const handleRepos = ({ target }) => {
    props.setRepos(target.value);
  }

  const handleType = ({ target }) => {
    props.setType(target.value);
  }

  return (
    <>
      <Container>
        <InputContainer>
          <FormLabel>Min Followers</FormLabel>
          <FormInput
            width="110px"
            type="number"
            value={props.followers}
            onChange={handleFollowers}
          />
        </InputContainer>
        <InputContainer>
          <FormLabel htmlFor="type">Type</FormLabel>
          <FormSelect
            id="type"
            value={props.type}
            onChange={handleType}
            width="150px"
          >
            <FormOption value="Organization">Organization</FormOption>
            <FormOption value="User">User</FormOption>
          </FormSelect>
        </InputContainer>
        <InputContainer>
          <FormLabel>Min Repos</FormLabel>
          <FormInput
            width="110px"
            type="number"
            value={props.repos}
            onChange={handleRepos}
          />
        </InputContainer>
      </Container>
    </>
  );
}

export default UserForm;
