import React from "react";
import PropTypes from "prop-types";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

const Search = ({ handleSearch }) => {
    return (
        <InputGroup className="search my-4">
            <FormControl
                placeholder="Type to filter accommodations"
                onChange={event => handleSearch(event)}
            />
        </InputGroup>
    );
}

Search.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};

export default Search;