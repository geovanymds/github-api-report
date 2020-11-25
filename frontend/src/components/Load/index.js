import React from 'react'
import { Button } from './styles';

function Load(props) {
  return (
    <Button onClick={props.onClick}>
      {props.children}
    </Button>
  )
}

export default Load
