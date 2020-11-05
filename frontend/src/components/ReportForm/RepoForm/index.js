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
} from "./styles";
import { GlobalContext } from "../../../GlobalStorage";
import icon from "../../../assets/icons/arrow_right.svg";

function RepoForm({ lang, handleLang, setLang, langList, setLangList }) {
  const { globals } = useContext(GlobalContext);

  const handleList = () => {
    if(!langList.includes(lang)) {
      setLangList([lang, ...langList]);
    }
    setLang("");
  };

  return (
    <>
      <FormLabel htmlFor="languages">Languages</FormLabel>
      <Container>
        <SubContainer>
          <FormInput
            list="languagesOptions"
            value={lang}
            onChange={handleLang}
            placeholder="Type a Language"
            width="200px"
          />
          <DataList id="languagesOptions">
            {globals.languages.map((language) => (
              <FormOption key={language} value={language}>
                {language}
              </FormOption>
            ))}
          </DataList>
          <Button onClick={handleList}>
            <ImgButton src={icon} alt="insert" height="30px" width="30px" />
          </Button>
        </SubContainer>
        <Languages>
          <List>
            {langList.length>0 &&
              langList.map((language, index) => (
                <ListItem key={index}>{language}</ListItem>
              ))}
          </List>
        </Languages>
      </Container>
    </>
  );
}

export default RepoForm;
