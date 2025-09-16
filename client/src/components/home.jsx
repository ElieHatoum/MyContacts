import { Box } from "@mui/material";
import ContactList from "./contacts/contactList";
import Bar from "./bar";
import { useState, useEffect } from "react";
import axios from "axios";
import ContactPopup from "./contactPopup";

function HomePage() {
    const [contacts, setContacts] = useState([]);
    const [popup, setPopup] = useState({
        open: false,
        editing: false,
        contact: null,
    });

    const handleClose = () =>
        setPopup({ open: false, editing: false, contact: null });

    async function getContacts() {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(
                "https://mycontacts-ojpo.onrender.com/api/contacts",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setContacts(response.data.data);
        } catch (error) {
            console.error(
                "Error fetching contacts:",
                error.response?.data || error.message
            );
        }
    }

    useEffect(() => {
        getContacts();
    }, []);
    return (
        <Box sx={{ maxWidth: 800, mx: "auto", px: 2 }}>
            <Bar
                onAddClick={() =>
                    setPopup({ open: true, editing: false, contact: null })
                }
            />
            <ContactList
                contacts={contacts}
                onDeleteContact={getContacts}
                onUpdateContact={getContacts}
                onEditClick={(contact) =>
                    setPopup({ open: true, editing: true, contact })
                }
            />
            <ContactPopup
                isOpen={popup.open}
                isEditing={popup.editing}
                contact={popup.contact}
                handleClose={handleClose}
                onChange={getContacts}
            />
        </Box>
    );
}

export default HomePage;
