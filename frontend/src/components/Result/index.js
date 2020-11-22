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
  Container
} from "./styles";

function Result() {
  
  const { globals } = useContext(GlobalContext);

  return (
    <>
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
    </>
  );

}
export default Result;