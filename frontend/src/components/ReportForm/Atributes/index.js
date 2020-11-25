import React, { useContext} from "react";
import { GlobalContext } from "../../../GlobalStorage";
import { Container, Attribute } from "./styles";

function Attributes({ attrList, handleAttributes, table }) {
  
  const { globals } = useContext(GlobalContext);

  return (
    <>
      <Container>
        {table==="Users"?globals.attrUser.map((attribute) => (
          <Attribute
            key={attribute}
            attrList={attrList}
            attr={attribute}
            onClick={handleAttributes}
          >
            {attribute}
          </Attribute>
        )):globals.attrRepos.map((attribute) => (
          <Attribute
            key={attribute}
            attrList={attrList}
            attr={attribute}
            onClick={handleAttributes}
          >
            {attribute}
          </Attribute>
        ))}
      </Container>
    </>
  );
}

export default Attributes;
