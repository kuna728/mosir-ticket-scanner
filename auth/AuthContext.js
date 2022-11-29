import {createContext} from "react";

export const AuthContext = createContext({
    token: null,
    legalName: '',
    login: (username, password) => {},
    logout: () => {}
})