import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BASE_URL, headers } from "../../../constants/api";

import { IconContext } from "react-icons";
import { MdArrowBack } from "react-icons/md";

function AddHotel() {
    const { register, handleSubmit } = useForm();

    const history = useHistory();

    async function onSubmit(data) {
        console.log("data", data);

        const url = BASE_URL + "establishments";

        const options = { headers, method: "POST", body: JSON.stringify(data) };

        await fetch(url, options);

        history.push("/admin/hotels");
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Admin | Add Hotel</title>
            </Helmet>

            <IconContext.Provider value={{ style: { marginBottom: '2px' } }}>
                <NavLink to="/admin/" exact className="nav-link"><MdArrowBack /> Back to Admin Dashboard</NavLink>
            </IconContext.Provider >

            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="text-center my-3">
                    <h2>Create New Hotel</h2>
                </div>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" placeholder="Enter a name for the hotel" ref={register} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" placeholder="Enter an email address" ref={register} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control name="image" placeholder="Image link" ref={register} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Max Guest</Form.Label>
                    <Form.Control name="maxGuests" placeholder="Max Guests" ref={register} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control name="price" placeholder="Price per night" ref={register} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" placeholder="Description" ref={register} />
                </Form.Group>
                <Button className="btn btn-secondary" type="submit">Submit</Button>
            </Form>
        </>
    );
}

export default AddHotel;
