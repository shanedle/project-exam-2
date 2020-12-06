import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Image, Form, Row } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import ErrorMessage from "../error/ErrorMessage";

function Login() {
    const schema = yup.object().shape({
        username: yup
            .string()
            .required("Username is required.")
            .min(2, "Username must be at least 2 characters"),

        password: yup
            .string()
            .required("Password is required")
            .min(5, "Password must be at least 5 characters")
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    const { login } = useContext(AuthContext);

    const history = useHistory();

    function onSubmit(data) {
        console.log("data", data);
        login(data.username, data.password);
        history.push("/admin");
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Holidaze | Login</title>
            </Helmet>

            <div className="text-center my-3">
                <h2>Admin Login</h2>
            </div>

            <Row>
                <Col sm={12} md={6}>
                    <Image src={process.env.PUBLIC_URL + './images/undraw_login.svg'} alt="Login Image" className="img-fluid" rounded />
                </Col>

                <Col sm={12} md={6}>
                    <Form onSubmit={handleSubmit(onSubmit)} className="my-3">
                        <Form.Group>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Enter username" ref={register} />
                            {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Enter password" ref={register} />
                            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        </Form.Group>

                        <Row>
                            <Col>
                                <Button type="submit" className="btn btn-primary float-right">Login</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>

            </Row>

        </>
    );
}

export default Login;
