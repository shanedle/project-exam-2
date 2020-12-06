import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { BASE_URL, headers, PATCH } from "../../../constants/api";
import DeleteHotel from "./DeleteHotel";

import { IconContext } from "react-icons";
import { MdArrowBack } from "react-icons/md";

function AddHotel() {
    const defaultState = {
        name: "",
        email: "",
        image: "",
        maxGuests: "",
        price: "",
        description: "",
    };

    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const [hotel, setHotel] = useState(defaultState);

    let { id } = useParams();

    const options = { headers };
    const fetchUrl = BASE_URL + "establishments/" + id;

    useEffect(() => {
        fetch(fetchUrl, options)
            .then((response) => response.json())
            .then((json) => setHotel(json))
            .catch((error) => console.log(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function onSubmit(data) {
        console.log("data", data);

        const updateOptions = { headers, method: PATCH, body: JSON.stringify(data) };
        await fetch(fetchUrl, updateOptions);
        history.push("/admin/hotels");
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Admin | Edit Hotel</title>
            </Helmet>

            <IconContext.Provider value={{ style: { marginBottom: '2px' } }}>
                <NavLink to="/admin/hotels" exact className="nav-link"><MdArrowBack /> Back to Hotel List</NavLink>
            </IconContext.Provider >

            <div className="text-center my-3">
                <h2>Edit Hotel</h2>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" defaultValue={hotel.name} placeholder="Enter a name for the hotel" ref={register} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control name="email" defaultValue={hotel.email} placeholder="Enter an email address" ref={register} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control name="image" defaultValue={hotel.image} placeholder="Image link" ref={register} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Max Guest</Form.Label>
                    <Form.Control name="maxGuests" defaultValue={hotel.maxGuests} placeholder="Max Guests" ref={register} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control name="price" defaultValue={hotel.price} placeholder="Price per night" ref={register} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" defaultValue={hotel.description} placeholder="Description" ref={register} />
                </Form.Group>

                <ButtonGroup aria-label="Button Group">
                    <Button className="btn btn-secondary" type="submit">Update</Button>
                    <DeleteHotel id={id} />
                </ButtonGroup>
            </Form>
        </>
    );
}

export default AddHotel;
