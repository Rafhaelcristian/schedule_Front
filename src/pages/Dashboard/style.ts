import styled from "styled-components";

export const StyledDashboardPage = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 50px;
  padding: 0 100px;
  background-color: aliceblue;
  header {
    width: 100%;
    display: flex;
    gap: 10px;
    padding: 10px 10px 10px 10px;
    justify-content: space-between;
    div {
      display: flex;
      flex-direction: column;
      gap: 10px;
      div {
        display: flex;
        flex-direction: row;
      }
    }
    button {
      padding: 10px;
      background: blueviolet;
      color: white;
      border-radius: 10px;
    }
  }
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: center;
    li {
      border: solid 1px violet;
      background-color: whitesmoke;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 180px;
      width: 140px;
      padding: 5px;
      button {
        padding: 5px;
        background: blueviolet;
        color: white;
        border-radius: 10px;
      }
    }
  }
`;
