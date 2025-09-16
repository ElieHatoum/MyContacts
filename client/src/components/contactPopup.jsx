import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function ContactPopup({ isOpen, isEditing, contact, handleClose, onChange }) {
    const [contactData, setContactData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
    });

    const [newContact, setNewContact] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
    });

    useEffect(() => {
        if (isEditing) {
            setContactData({
                firstName: contact.firstName,
                lastName: contact.lastName,
                phoneNumber: contact.phoneNumber,
            });
            setNewContact({
                firstName: contact.firstName,
                lastName: contact.lastName,
                phoneNumber: contact.phoneNumber,
            });
        } else {
            setContactData({
                firstName: "",
                lastName: "",
                phoneNumber: "",
            });
            setNewContact({
                firstName: "",
                lastName: "",
                phoneNumber: "",
            });
        }
    }, [isEditing, contact]);

    function resetFields() {
        setContactData({
            firstName: "",
            lastName: "",
            phoneNumber: "",
        });
        setNewContact({
            firstName: "",
            lastName: "",
            phoneNumber: "",
        });
    }

    function getChanges() {
        const changes = {};
        for (let key in contactData) {
            if (newContact[key] !== contactData[key]) {
                changes[key] = newContact[key];
            }
        }
        return changes;
    }

    const handleCreateContact = async () => {
        const token = localStorage.getItem("accessToken");
        await axios.post("http://localhost:3000/api/contacts", newContact, {
            headers: { Authorization: `Bearer ${token}` },
        });
        handleClose();
        resetFields();
        onChange();
    };

    const handleUpdateContact = async () => {
        const token = localStorage.getItem("accessToken");
        const changes = getChanges();
        console.log(changes);
        await axios.patch(
            `http://localhost:3000/api/contacts/${contact._id}`,
            changes,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        handleClose();
        resetFields();
        onChange();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEditing) {
            await handleCreateContact();
        } else {
            await handleUpdateContact();
        }
    };

    const title = isEditing ? "Edit contact" : "Add contact";
    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box sx={{ ...style, width: 200, height: 300, mt: 5 }}>
                <Stack spacing={1}>
                    <Typography variant="h6" component="h2" align="center">
                        {title}
                    </Typography>
                    <TextField
                        id="firstName"
                        label="First Name"
                        variant="outlined"
                        autoComplete="off"
                        required
                        type="string"
                        value={newContact.firstName}
                        onChange={(e) =>
                            setNewContact({
                                ...newContact,
                                firstName: e.target.value,
                            })
                        }
                    />
                    <TextField
                        id="lastName"
                        label="Last Name"
                        variant="outlined"
                        autoComplete="off"
                        required
                        type="string"
                        value={newContact.lastName}
                        onChange={(e) =>
                            setNewContact({
                                ...newContact,
                                lastName: e.target.value,
                            })
                        }
                    />
                    <TextField
                        id="phoneNumber"
                        label="Phone Number"
                        variant="outlined"
                        autoComplete="off"
                        required
                        type="string"
                        value={newContact.phoneNumber}
                        onChange={(e) =>
                            setNewContact({
                                ...newContact,
                                phoneNumber: e.target.value,
                            })
                        }
                    />
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        type="submit"
                        fullWidth
                    >
                        SUBMIT
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}

export default ContactPopup;
