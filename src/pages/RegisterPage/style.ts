import styled from "styled-components";

export const StyledRegisterPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 50px;
  padding: 0 100px;
  header {
    padding-bottom: 50px;
    width: 100%;
    a {
      font-style: none;
      color: white;
      background: blueviolet;
      padding: 10px;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-width: 50vh;
    padding: 30px;
    background-color: whitesmoke;
    border-radius: 10px;
    div {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      padding: 0 20px;
      input {
        display: flex;
        align-items: center;

        padding: 5px 10px;
        border: solid 1px;
        border-radius: 4px;
      }
    }
    button {
      background: blueviolet;
      color: white;
      padding: 5px 10px;
      border: solid 1px;
      border-radius: 4px;
    }
  }
`;
