import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Col, Image, Row, Form } from "react-bootstrap";
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
        .email("Please enter a valid email address. For example, “johndoe@gmail.com”."),
    message: yup
        .string()
        .required("Message is required.")
        .min(10, "Message must be at least 10 characters.")
});

const Contact = () => {
    const [show, setShow] = useState(false);

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data, event) {
        console.log("data", data);
        setShow(false);
        const url = BASE_URL + "contacts";
        const options = { headers, method: "POST", body: JSON.stringify(data) };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setShow(true);
        }
        event.target.reset();
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Holidaze | Contact</title>
            </Helmet>

            <div className="text-center my-3">
                <h2>We'd love to hear from you</h2>
                <p>Send us a message and we'll respond as soon as possible.</p>
            </div>


            <Row>
                <Col sm={12} md={6} lg={5} xl={4}>
                    <Image src={process.env.PUBLIC_URL + './images/undraw_mailbox.svg'} alt="Login Image" className="img-fluid" rounded />
                </Col>

                <Col sm={12} md={6} lg={7} xl={8}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {show &&
                            <Alert variant="success" onClose={() => setShow(false)} dismissible className="my-3">
                                <Alert.Heading>Thank you!</Alert.Heading>
                                <p>Your message has been successfully sent. We will contact you very soon!</p>
                            </Alert>
                        }

                        <Form.Group>
                            <Form.Label>Full Name *</Form.Label>
                            <Form.Control name="name" placeholder="Enter your name" ref={register} />
                            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email Address*</Form.Label>
                            <Form.Control name="email" placeholder="Enter your email address" ref={register} />
                            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Message *</Form.Label>
                            <Form.Control name="message" as="textarea" placeholder="Message must be at least 10 characters." ref={register} />
                            {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
                        </Form.Group>

                        <Row className="mb-3">
                            <Col>
                                <IconContext.Provider value={{ style: { marginBottom: '2px' } }}>
                                    <Button type="submit" className="btn btn-primary float-right">Submit <MdSend /> </Button>
                                </IconContext.Provider >
                            </Col>
                        </Row>
                    </Form>
                </Col>

            </Row>

        </>
    );
}

export default Contact;