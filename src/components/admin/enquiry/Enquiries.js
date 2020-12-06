import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Table, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet";
import moment from "moment";
import { BASE_URL, headers } from "../../../constants/api";
import DeleteEnquiry from "./DeleteEnquiry";

import { IconContext } from "react-icons";
import { MdArrowBack } from "react-icons/md";

const Enquiries = () => {
    const [enquiries, SetEnquiries] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    const url = BASE_URL + "enquiries";

    const options = { headers };

    useEffect(() => {
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                if (json.error) {
                    SetEnquiries([]);
                    setError(json.message);
                } else {
                    SetEnquiries(json);
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
                <title>Admin | Enquiries</title>
            </Helmet>

            <IconContext.Provider value={{ style: { marginBottom: '2px' } }}>
                <NavLink to="/admin/" exact className="nav-link"><MdArrowBack /> Back to Admin Dashboard</NavLink>
            </IconContext.Provider >

            <div className="text-center my-5">
                <h2>Enquiry List</h2>
            </div>
            {error && <div className="error">{error}</div>}

            <Table striped bordered responsive hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Establishment Id</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {enquiries.map((enquiry, index) => {
                        return (
                            <tr key={enquiry.id} className="my-3">
                                <td>{index + 1}</td>
                                <td>{enquiry.name}</td>
                                <td>{enquiry.email}</td>
                                <td>{enquiry.establishmentId}</td>
                                <td>{moment(enquiry.checkIn).format("LL")}</td>
                                <td>{moment(enquiry.checkOut).format("LL")}</td>
                                <td><DeleteEnquiry id={enquiry.id} /></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default Enquiries;
