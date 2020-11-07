import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../../GlobalStorage";
import { Container, Attribute } from "./styles";

function Attributes({ attrList, handleAttributes }) {

  const { globals } = useContext(GlobalContext);

  // useEffect(()=>{console.log(isActive)},[isActive]);

  return (
    <>
      <Container>
        {globals.attrRepos.map((attribute) => (
          <Attribute
            key={attribute}
            attrList={attrList}
            attr={attribute}
            // indexKey={attribute}
            // isActive={isActive[attribute]}
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
