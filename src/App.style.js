import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        padding:0;
        margin:0;
    }
    body {
      font-family: 'Poppins', sans-serif;
      overflow-y: auto;
        ::-webkit-scrollbar {
          width: 0.5rem;
          height: 0.5rem;
        }
        ::-webkit-scrollbar-track {
          background: #e7e2e2;
        }
        ::-webkit-scrollbar-thumb {
          background: ${(props) => props.theme.main};
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: ${(props) => props.theme.darkMain};
        }
    }
`;
