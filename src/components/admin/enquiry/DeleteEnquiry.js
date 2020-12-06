import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { IconContext } from "react-icons";
import { MdDelete } from "react-icons/md";
import { BASE_URL, headers, DELETE } from "../../../constants/api";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const DeleteEnquiry = (props) => {
    const history = useHistory();

    function checkDelete() {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure?',
            buttons: [
                {
                    label: "yes",
                    onClick: () => deleteEnq(),
                },
                {
                    label: "no",
                },
            ],
        });
    }

    async function deleteEnq() {
        const url = BASE_URL + "enquiries/" + props.id;
        const options = { headers, method: DELETE };
        await fetch(url, options);
        history.push("/admin/enquiries");
    }

    return (
        <IconContext.Provider value={{ size: "1.5em", style: { marginBottom: '2px' } }}>
            <Button variant="danger" onClick={checkDelete}><MdDelete /></Button>
        </IconContext.Provider >);
}

export default DeleteEnquiry;
