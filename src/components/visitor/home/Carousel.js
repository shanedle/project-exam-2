import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, ResponsiveEmbed } from "react-bootstrap";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { MdStar, MdKeyboardArrowRight } from "react-icons/md";

const Carousel = ({ id, image, name, price }) => {
    return (
        <Card key={id}>
            <ResponsiveEmbed aspectRatio="16by9">
                <Card.Img variant="top" src={image} />
            </ResponsiveEmbed>
            <Card.Body className="card__body--bg">
                <Card.Title className="card__title card__title--blue">{name}</Card.Title>
                <Card.Text>
                    <IconContext.Provider value={{ size: "1em", className: "card__rating--yellow" }}>
                        <MdStar /><MdStar /><MdStar /><MdStar /><MdStar />
                    </IconContext.Provider >
                </Card.Text>

                <Card.Text className="card__price float-right">NOK {price}</Card.Text>

                <Link to={"/accommodation/" + id}>
                    <IconContext.Provider value={{ style: { marginBottom: '2px' } }}>
                        <Button className="btn btn-primary" block>Check availability <MdKeyboardArrowRight /> </Button>
                    </IconContext.Provider >
                </Link>
            </Card.Body>
        </Card>
    )
}

Carousel.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};
export default Carousel;
