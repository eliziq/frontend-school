import { NavigationContainer } from "./NavigationStyle";
import { Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <NavigationContainer>
        <h2> Navigation Bar</h2>
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
