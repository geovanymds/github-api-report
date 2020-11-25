import React, {useContext} from "react";
import { GlobalContext } from "../../GlobalStorage";
import {
  Table,
  TLabel,
  Td,
  Tr,
  Th,
  Tbody,
  Thead,
  Container,
  ButtonContainer,
  Title
} from "./styles";
import Load from "../Load";
import api from "../../services/api";

function Result() {
  
  const { globals } = useContext(GlobalContext);

  const nextPage = async (event) => {
    event.preventDefault();
    let params = globals.params;
    let response;
    try {
      if(params.tablename === "Users"){
        if(params.offset+1 <= globals.totalUsers){
          params.offset = params.offset+1;
          response = await api.get('/users/report', {
            params: params
          })
          if(!!response.data.repos&&response.data.repos.length>0) {
            globals.setResponse([...response.data.repos]);
          } else if (!!response.data.users&&response.data.users.length>0) {
            globals.setResponse([...response.data.users]);
          }
          globals.setParams(params);
        }
      }
      else{
        if(params.offset+1 <= globals.totalRepos){
          params.offset = params.offset+1;
          response = await api.get('/repositories/report', {
            params: params
          })
          if(!!response.data.repos&&response.data.repos.length>0) {
            globals.setResponse([...response.data.repos]);
          } else if (!!response.data.users&&response.data.users.length>0) {
            globals.setResponse([...response.data.users]);
          }
          globals.setParams(params);
        }
      }
    } catch(error) {
      console.log(error);
    }
  }

  const previusPage = async (event) => {
    event.preventDefault();
    let params = globals.params;
    let response;
    try {
      if(params.offset > 0){
        params.offset--;
        if(params.tablename === "Users"){
          response = await api.get('/users/report', {
            params: params
          })
        }
        else{
          response = await api.get('/repositories/report', {
            params: params
          })
        }
        if(!!response.data.repos&&response.data.repos.length>0) {
          globals.setResponse([...response.data.repos]);
        } else if (!!response.data.users&&response.data.users.length>0) {
          globals.setResponse([...response.data.users]);
        }
        globals.setParams(params);
      }
    } catch(error) {
      console.log(error);
    }
    
  }



  return (
    <>
    <Title>Result</Title>
    <Container>
      <Thead>
        <Table cellpadding="0" cellspacing="0" border="0">
          <Thead>
              <Tr>
                {Object.keys(globals.response[0]).map((key, index) => {
                  return(
                    <Th key={index}><TLabel>{key === "stargazers_count" ? "stars" : key}</TLabel></Th>
                  );              
                })}
              </Tr>
          </Thead>
        </Table>
      </Thead>
      <Tbody>
        <Table cellpadding="0" cellspacing="0" border="0">
          <tbody>
            {globals.response.map((resp, index) => {
              return(
                <Tr key={index}>
                  {Object.values(resp).map((data, index_novo) =>{
                    return(
                    <Td key={index_novo}>{data}</Td>
                    );
                  })}
                </Tr>
              );
            })}
          </tbody>
        </Table>
      </Tbody>
      </Container>
      <ButtonContainer>
      <Load onClick={previusPage}>
        Previous
      </Load>
      <Load onClick={nextPage}>
        Next
      </Load>
      </ButtonContainer>
    </>
  );

}
export default Result;