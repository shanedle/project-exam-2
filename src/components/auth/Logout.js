import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../context/AuthContext";

function Login() {
    const { logout } = useContext(AuthContext);
    const history = useHistory();

    function doLogout() {
        logout();
        history.push("/");
    }

    return <Button className="btn btn-secondary" onClick={doLogout}>Log out</Button>;
}

export default Login;
