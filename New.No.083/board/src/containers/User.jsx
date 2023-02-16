import { UserComponent } from "../components/User";

export const UserContainer = ({ userName, setUser }) => {
  const logOutFunc = () => {
    setUser({ name: "" });
  };

  return <UserComponent userName={userName} logOut={logOutFunc} />;
};
