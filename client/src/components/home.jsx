import Box from "@mui/material/Box";
import ContactList from "./contacts/contactList";
import Bar from "./bar";
import { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
    const [contacts, setContacts] = useState([]);

    async function getContacts() {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(
                "http://localhost:3000/api/contacts",
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
        <Box>
            <Bar onCreateContact={getContacts} />
            <ContactList contacts={contacts} onDeleteContact={getContacts} />
        </Box>
    );
}

export default HomePage;
