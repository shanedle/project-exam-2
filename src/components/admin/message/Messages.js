import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Card, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet";
import moment from "moment";
import { BASE_URL, headers } from "../../../constants/api";
import DeleteMessage from "./DeleteMessage";

import { IconContext } from "react-icons";
import { MdArrowBack } from "react-icons/md";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const url = BASE_URL + "contacts";

    const options = { headers };

    useEffect(() => {
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                if (json.error) {
                    setMessages([]);
                    setError(json.message);
                } else {
                    setMessages(json);
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        const spinnerStyle = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
        return (
            <div style={spinnerStyle}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Admin | Messages</title>
            </Helmet>

            <IconContext.Provider value={{ style: { marginBottom: '2px' } }}>
                <NavLink to="/admin/" exact className="nav-link"><MdArrowBack /> Back to Admin Dashboard</NavLink>
            </IconContext.Provider >

            <div className="text-center my-5">
                <h2>Message List</h2>
            </div>
            {error && <div className="error">{error}</div>}
            <ul>
                {messages.map((message) => {
                    return (
                        <Card key={message.id} className="my-3">
                            <Card.Header>{message.email}</Card.Header>
                            <Card.Body>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {' '}
                                        {message.message}{' '}
                                    </p>
                                    <footer className="blockquote-footer">
                                        <cite title="Source Title">{message.name}</cite>
                                    </footer>
                                </blockquote>
                            </Card.Body>
                            <Card.Footer className="text-muted">{moment(message.createdAt).format("LL")}</Card.Footer>
                            <DeleteMessage id={message.id} />
                        </Card>
                    );
                })}
            </ul>
        </>
    );
}

export default Messages;
