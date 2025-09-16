import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "@mui/material/Alert";

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

    const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage("");
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
        try {
            await axios.post(
                "https://mycontacts-ojpo.onrender.com/api/contacts",
                newContact,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            handleClose();
            resetFields();
            onChange();
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                let message = error.response.data.message;
                setErrorMessage(message.split(":").pop().trim());
            } else {
                setErrorMessage("An unexpected error occurred");
            }
        }
    };

    const handleUpdateContact = async () => {
        const token = localStorage.getItem("accessToken");
        const changes = getChanges();
        try {
            await axios.patch(
                `https://mycontacts-ojpo.onrender.com/api/contacts/${contact._id}`,
                changes,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            handleClose();
            resetFields();
            onChange();
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                let message = error.response.data.message;
                setErrorMessage(message.split(":").pop().trim());
            } else {
                setErrorMessage("An unexpected error occurred");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEditing) {
            await handleCreateContact();
        } else {
            await handleUpdateContact();
        }
    };

    const handleCancel = () => {
        resetFields();
        handleClose();
    };

    const title = isEditing ? "Edit contact" : "Add contact";
    return (
        <Modal
            open={isOpen}
            onClose={() => {
                handleClose();
                resetFields();
            }}
        >
            <Box
                sx={{
                    ...style,
                    width: 400,
                    height: 400,
                    mt: 5,
                    borderRadius: "20px",
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Typography variant="h6" component="h2" align="center">
                            {title}
                        </Typography>

                        {errorMessage && (
                            <Alert variant="outlined" severity="error">
                                {errorMessage}
                            </Alert>
                        )}

                        <TextField
                            id="firstName"
                            label="First Name"
                            variant="outlined"
                            autoComplete="off"
                            required
                            type="string"
                            fullWidth
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
                            fullWidth
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
                            fullWidth
                            value={newContact.phoneNumber}
                            onChange={(e) =>
                                setNewContact({
                                    ...newContact,
                                    phoneNumber: e.target.value,
                                })
                            }
                        />

                        <Box display="flex" gap={2} justifyContent="flex-end">
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ flex: 1 }}
                            >
                                SUBMIT
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleCancel}
                                color="error"
                                sx={{ flex: 1 }}
                            >
                                CANCEL
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
}

export default ContactPopup;
