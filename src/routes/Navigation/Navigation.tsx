import { NavigationContainer } from "./NavigationStyle";
import { Outlet, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavigationContainer>
        <h2 onClick={() => navigate("/")}> Home</h2>
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
