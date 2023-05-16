import Context from "./Context";
import useStorage from "../utils/useStorage";

const StoreProvider = ({ children }) => {
  const [token, setToken] = useStorage("token");
  const [role, setRole] = useStorage("role");

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        role,
        setRole,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default StoreProvider;
