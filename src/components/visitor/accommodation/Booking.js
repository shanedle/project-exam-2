import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Modal, Form } from "react-bootstrap";
import { IconContext } from "react-icons";
import { MdSend } from "react-icons/md";
import ErrorMessage from "../../error/ErrorMessage";
import { BASE_URL, headers } from "../../../constants/api";

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required.")
        .min(2, "Name must be at least 2 characters."),
    email: yup
        .string()
        .required("Email address is required.")
        .email("Email address must be entered."),
    checkIn: yup
        .string()
        .required("Pleace select a check-in date."),
    checkOut: yup
        .string()
        .required("Pleace select a check-out date.")
});

const Booking = (props) => {
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data, event) {
        console.log("data", data);

        const url = BASE_URL + "enquiries";
        const enquiry = {
            "name": data.name,
            "email": data.email,
            "establishmentId": props.id,
            "checkIn": data.checkIn,
            "checkOut": data.checkOut
        }
        const options = { headers, method: "POST", body: JSON.stringify(enquiry) };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
        }

        event.target.reset();
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Booking at {props.name}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Full Name *</Form.Label>
                        <Form.Control name="name" placeholder="Enter your name" ref={register} />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email Address *</Form.Label>
                        <Form.Control name="email" placeholder="Enter your email address" ref={register} />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCheckIn">
                            <Form.Label>Check-In *</Form.Label>
                            <Form.Control type="date" name="checkIn" ref={register} />
                            {errors.checkIn && <ErrorMessage>{errors.checkIn.message}</ErrorMessage>}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCheckIn">
                            <Form.Label>Check-Out *</Form.Label>
                            <Form.Control type="date" name="checkOut" ref={register} />
                            {errors.checkOut && <ErrorMessage>{errors.checkOut.message}</ErrorMessage>}
                        </Form.Group>
                    </Form.Row>

                </Modal.Body>

                <Modal.Footer>
                    <IconContext.Provider value={{ style: { marginBottom: '2px' } }}>
                        <Button type="submit" className="btn btn-primary" block>Confirm Booking <MdSend /> </Button>
                    </IconContext.Provider >
                </Modal.Footer>
            </Form>

        </Modal>
    );
}

export default Booking;