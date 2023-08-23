import Header from "../Header/Header";
import NoUser from "../Auth/NoUser";

const Shift = () => {
  const localStorageUser = localStorage.getItem("user");
  const user = localStorageUser !== null ? JSON.parse(localStorageUser) : "";

  return (
    <>
      {user ? (
        <div>
          <Header />
          <div>coming soon...</div>
        </div>
      ) : (
        <NoUser />
      )}
    </>
  );
};

export default Shift;
