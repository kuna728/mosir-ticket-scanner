import {useState} from "react";
import {BASE_URL, ROLE_COACH, ROLE_MANAGER} from "../constans";
import WrongRoleException from "./WrongRoleException";
import {AuthContext} from "./AuthContext";

export default function AuthProvider({children}) {
    const [token, setToken] = useState(null);
    const [legalName, setLegalName] = useState('');

    const login = (username, password) => fetch(BASE_URL + "/api/auth/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password})
    }).then(res => {
        if(res.ok) {
            return res.json()
        }
        throw new Error(res.status);
    }).then(json => {
        if(json.success) {
            if(json.role === ROLE_COACH || json.role === ROLE_MANAGER) {
                setToken(json.token);
                setLegalName(`${json.firstName} ${json.lastName}`);
                return true;
            }
            throw new WrongRoleException();
        }
        return false
    })

    const logout = () => {
        setToken(null);
        setLegalName('');
    }

    return (
        <AuthContext.Provider value={{token, legalName, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}