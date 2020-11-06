import React, { useContext } from "react";
import { FormInput, FormLabel, FormOption, DataList } from "../styles";
import {
  Languages,
  List,
  ListItem,
  Button,
  ImgButton,
  Container,
  SubContainer,
  InputContainer,
} from "./styles";
import { GlobalContext } from "../../../GlobalStorage";
import icon from "../../../assets/icons/arrow_right.svg";

function RepoForm(props) {
  const { globals } = useContext(GlobalContext);

  const handleList = () => {
    if (!props.langList.includes(props.lang) && props.lang.length > 0) {
      props.setLangList([props.lang, ...props.langList]);
    }
    props.setLang("");
  };

  const removeList = ({ target }) => {
    const newList = props.langList.filter((lang) => {
      return lang !== target.innerText;
    });
    props.setLangList(newList);
  };

  const handleStars = ({ target }) => {
    props.setStars(target.value);
  }

  const handleForks = ({ target }) => {
    props.setForks(target.value);
  }

  return (
    <>
      <FormLabel htmlFor="languages">Languages</FormLabel>
      <Container>
        <SubContainer>
          <FormInput
            list="languagesOptions"
            value={props.lang}
            onChange={props.handleLang}
            placeholder="Type a Language"
            width="200px"
          />
          <DataList id="languagesOptions">
            {globals.languages.map((language, index) => (
              <FormOption key={language} value={language}>
                {language}
              </FormOption>
            ))}
          </DataList>
          <Button onClick={handleList}>
            <ImgButton src={icon} alt="insert" height="30px" width="30px" />
          </Button>
          <InputContainer>
            <FormLabel>Min Stars</FormLabel>
            <FormInput
              width="85px"
              type="number"
              value={props.stars}
              onChange={handleStars}
            />
          </InputContainer>
          <InputContainer>
            <FormLabel>Min Forks</FormLabel>
            <FormInput
              width="85px"
              type="number"
              value={props.forks}
              onChange={handleForks}
            />
          </InputContainer>
          <InputContainer>
            <FormLabel>Creation date begin</FormLabel>
            <FormInput
              width="200px"
              type="date"
            />
          </InputContainer>
          <InputContainer>
            <FormLabel>Creation date end</FormLabel>
            <FormInput
              width="200px"
              type="date"
            />
          </InputContainer>
        </SubContainer>
        <Languages>
          <List>
            {props.langList.length > 0 &&
              props.langList.map((language, index) => (
                <ListItem key={index} onClick={removeList}>
                  {language}
                </ListItem>
              ))}
          </List>
        </Languages>
      </Container>
    </>
  );
}

export default RepoForm;
