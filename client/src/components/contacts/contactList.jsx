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

function ContactList({ contacts, onDeleteContact, onEditClick }) {
    async function deleteContact(id) {
        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(`http://localhost:3000/api/contacts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onDeleteContact();
        } catch (error) {
            console.error(
                "Error deleting contact:",
                error.response?.data || error.message
            );
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                size={{
                    xs: 12,
                    md: 6,
                }}
            >
                <List>
                    {contacts.map((contact) => (
                        <ListItem
                            key={contact._id}
                            secondaryAction={
                                <Box display="flex" gap={1}>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => {
                                            deleteContact(contact._id);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="edit"
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
