import { createGlobalStyle } from "styled-components";
import colors from "../styles/colors";

export default createGlobalStyle`

  *{
    margin: 0;
    padding:0;
    outline: 0;
    box-sizing: border-box;
  }

  body{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    background: ${colors.dark_blue};
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  html, body, #root {
    height: 100%;
    color: ${colors.white}
  }

  ol, ul {
	  list-style: none;
  }

`;
