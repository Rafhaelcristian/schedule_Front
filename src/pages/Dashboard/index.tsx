import { useContext } from "react";
import { UserContext } from "../../providers/ClientContext";
import { Modal } from "../../components/modal";
import EditProfileForm from "../../components/EditProfileForm";
import ContactForm from "../../components/ContactForm";
import { ContactContext } from "../../providers/ContactContext";
import { StyledDashboardPage } from "./style";

function Dashboard() {
  const {
    user,
    contacts,
    isOpenModalUser,
    toggleModalEditUser,
    userLogout,
    deleteUser,
  } = useContext(UserContext);
  const {
    isOpenModalCreateCont,
    toggleModalCreateCont,
    isOpenModalEditCont,
    toggleModalEditCont,
  } = useContext(ContactContext);
  return (
    <StyledDashboardPage>
      <header>
        <div>
          <h4>
            Name: <span>{user?.name}</span>
          </h4>
          <h5>
            Email: <span>{user?.email}</span>
          </h5>
          <h5>
            Fone: <span>{user?.telephone}</span>{" "}
          </h5>
          <div>
            <button type="button" onClick={userLogout}>
              Logout
            </button>
            <button type="button" onClick={toggleModalEditUser}>
              Editar/Excluir profile
            </button>
          </div>
        </div>
        {isOpenModalUser && (
          <Modal toggleModal={toggleModalEditUser}>
            <EditProfileForm />
            <button onClick={deleteUser}>Deletar usuário</button>
          </Modal>
        )}

        <button type="button" onClick={toggleModalCreateCont}>
          Criar Contato
        </button>
        {isOpenModalCreateCont && (
          <Modal toggleModal={toggleModalCreateCont}>
            <ContactForm />
          </Modal>
        )}
      </header>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <p>{contact.name}</p>
            <p>{contact.email}</p>
            <p>{contact.second_email}</p>
            <p>{contact.telephone}</p>
            <p>{contact.second_telephone}</p>
            <button>Excluir</button>
            <button type="button" onClick={toggleModalEditCont} id={contact.id}>
              Editar
            </button>
            {isOpenModalEditCont && (
              <Modal toggleModal={toggleModalEditCont}>
                <ContactForm />
              </Modal>
            )}
          </li>
        ))}
      </ul>
    </StyledDashboardPage>
  );
}

export default Dashboard;
