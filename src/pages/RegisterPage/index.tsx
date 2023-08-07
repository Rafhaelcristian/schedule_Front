import { Link } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm";
import { StyledRegisterPage } from "./style";

function Register() {
  return (
    <StyledRegisterPage>
      <header>
        <Link to={"/"}>Login</Link>
      </header>
      <RegisterForm />
    </StyledRegisterPage>
  );
}

export default Register;
