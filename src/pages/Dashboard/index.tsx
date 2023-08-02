import { useContext } from "react";
import { UserContext } from "../../providers/ClientContext";

function Dashboard() {
  const { user, contacts } = useContext(UserContext);
  return (
    <>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
      <h1>{user?.telephone}</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <p>{contact.name}</p>
            <p>{contact.email}</p>
            <p>{contact.second_email}</p>
            <p>{contact.telephone}</p>
            <p>{contact.second_telephone}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Dashboard;
