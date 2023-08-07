import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routes";
import { UserContext } from "./providers/ClientContext";
import { GlobalStyles } from "./styles/global";

const App = () => {
  const { loading } = useContext(UserContext);
  return (
    <>
      <GlobalStyles />
      {loading ? <p>Carregando...</p> : <Router />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
};

export default App;
