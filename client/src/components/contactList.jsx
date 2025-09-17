import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

function ContactList({ contacts, onDeleteContact, onEditClick }) {
    const [errorMessage, setErrorMessage] = useState("");

    async function deleteContact(id) {
        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(
                `https://mycontacts-ojpo.onrender.com/api/contacts/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onDeleteContact();
        } catch (error) {
            console.error(
                "Error deleting contact:",
                error.response?.data || error.message
            );
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                let errorMessage =
                    error.response?.data?.message || "Something went wrong";

                setErrorMessage(errorMessage.split(":").pop().trim());
            } else {
                setErrorMessage(
                    "An unexpected error occured.\nCheck your internet connection"
                );
            }

            let timerInterval;
            Swal.fire({
                title: `${errorMessage}`,
                icon: "error",
                timer: 2500,
                timerProgressBar: true,
                showConfirmButton: false,
                didOpen: () => {
                    timerInterval = setInterval(100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            });
        }
    }

    return (
        <Box>
            <Grid>
                <List>
                    {contacts.map((contact) => (
                        <ListItem
                            sx={{
                                border: "1px solid #000",
                                borderRadius: "20px",
                                margin: "5px",
                            }}
                            key={contact._id}
                            secondaryAction={
                                <Box display="flex" gap={1.5}>
                                    <IconButton
                                        onClick={() => {
                                            deleteContact(contact._id);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => onEditClick(contact)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <AccountCircleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${contact.firstName} ${contact.lastName}`}
                                secondary={contact.phoneNumber}
                            />
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Box>
    );
}

export default ContactList;
