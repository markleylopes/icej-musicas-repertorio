import styled from "@emotion/styled";

export const CustomLayoutGrid = styled.section`
  background: #83a4d4; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #b6fbff,
    #83a4d4
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #b6fbff,
    #83a4d4
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 56px auto;
`;
