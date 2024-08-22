import { useReducer, useContext, createContext } from "react";
import storage from "./services/storage";

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
    case 'LOAD_USER':
      return storage.loadUser();
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null);
  return (
    <UserContext.Provider value={[user, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const [user] = useContext(UserContext);
  return user;
};

export const useUserDispatch = () => {
  const [, dispatch] = useContext(UserContext);
  return dispatch;
};
