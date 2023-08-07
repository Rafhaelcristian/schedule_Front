import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { StyledLoginPage } from "./style";

function Login() {
  return (
    <StyledLoginPage>
      <header>
        <Link to={"/cadastro"}>Cadastro</Link>
      </header>
      <LoginForm />
    </StyledLoginPage>
  );
}

export default Login;
