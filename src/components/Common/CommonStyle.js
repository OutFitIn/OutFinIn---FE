import styled from "styled-components";

export const Totalframe = styled.div`
  width: 390px;
  height: 100vh;
  border: 1px solid #eceeef;
  margin: 0 auto;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  
`;

export const ScreenComponent = styled.div`
  padding: 0px 18px;
`;

export const SubScreen = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 130px);
  &::-webkit-scrollbar{
    display:none;
  }
`;

export const ScreenJoin = styled.div`
  padding-top: 85px;
  display: flex;
  flex-direction: column;
  position: relative;
`

export const Flex = styled.div`
  display:flex;
`