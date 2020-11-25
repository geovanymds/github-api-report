import React, { useContext } from "react";
import { FormInput, FormLabel, FormOption, DataList } from "../styles";
import {
  BoxList,
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

  const handleLang = ({ target }) => {
    props.setLang(target.value);
  };

  const handleLic = ({ target }) => {
    props.setLic(target.value);
  };

  const handleOwner = ({ target }) => {
    props.setOwner(target.value);
  };

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
  };

  const handleForks = ({ target }) => {
    props.setForks(target.value);
  };


  const handleBeginDate = ({ target }) => {
    props.setBeginDate(target.value);
  };

  const handleEndDate = ({ target }) => {
    props.setEndDate(target.value);
  };

  const handleLicList = () => {
    if (!props.licList.includes(props.lic) && props.lic.length > 0) {
      props.setLicList([props.lic, ...props.licList]);
    }
    props.setLic("");
  };

  const removeLicList = ({ target }) => {
    const newList = props.licList.filter((lic) => {
      return lic !== target.innerText;
    });
    props.setLicList(newList);
  };

  return (
    <>
      <FormLabel htmlFor="languages">Languages</FormLabel>
      <Container>
        <SubContainer>
          <FormInput
            list="languagesOptions"
            value={props.lang}
            onChange={handleLang}
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
              value={props.beginDate}
              onChange={handleBeginDate}
            />
          </InputContainer>
          <InputContainer>
            <FormLabel>Creation date end</FormLabel>
            <FormInput
              width="200px"
              type="date"
              value={props.endDate}
              onChange={handleEndDate}
            />
          </InputContainer>
        </SubContainer>
        <BoxList>
          <List>
            {props.langList.length > 0 &&
              props.langList.map((language, index) => (
                <ListItem key={index} onClick={removeList}>
                  {language}
                </ListItem>
              ))}
          </List>
        </BoxList>
      </Container>
      <FormLabel htmlFor="licenses">Licenses</FormLabel>
      <Container>
        <SubContainer>
          <FormInput
            list="licensesOptions"
            value={props.lic}
            onChange={handleLic}
            placeholder="Type a License"
            width="200px"
          />
          <DataList id="licensesOptions">
            {globals.licenses.map((license) => (
              <FormOption key={license} value={license}>
                {license}
              </FormOption>
            ))}
          </DataList>
          <Button onClick={handleLicList}>
            <ImgButton src={icon} alt="insert" height="30px" width="30px" />
          </Button>
          <FormLabel htmlFor="owner">Owner</FormLabel>
          <FormInput
            value={props.owner}
            onChange={handleOwner}
            placeholder="Owner"
            width="201px"
          />
        </SubContainer>
        <BoxList height="100px">
          <List>
            {props.licList.length > 0 &&
              props.licList.map((license, index) => (
                <ListItem key={index} onClick={removeLicList}>
                  {license}
                </ListItem>
              ))}
          </List>
        </BoxList>
        
      </Container>
    </>
  );
}

export default RepoForm;
