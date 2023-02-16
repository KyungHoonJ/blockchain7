export const UserComponent = ({ userName, logOut }) => {
  return (
    <div>
      {userName} <button onClick={logOut}>log out</button>
    </div>
  );
};
