import { createContext, useReducer, useContext } from "react";

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.payload.user,
      };
    }
    case "SET_TOKEN": {
      return {
        ...state,
        token: action.payload.token,
      };
    }
    default:
      break;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, {
    user: null,
    token: null,
  });

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const user = useContext(UserContext)[0];
  return user;
};

export const useUserDispatch = () => {
  const dispatch = useContext(UserContext)[1];
  return dispatch;
};

export default UserContext;
