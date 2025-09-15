import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        })
    );
}

const Demo = styled("div")(({ theme }) => ({
    backgroundColor: (theme.vars || theme).palette.background.paper,
}));

function ContactList() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                size={{
                    xs: 12,
                    md: 6,
                }}
            >
                <Demo>
                    <List>
                        {generate(
                            <ListItem
                                secondaryAction={
                                    <Box display="flex" gap={1}>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
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
                                    primary="Single-line item"
                                    secondary={"Secondary text"}
                                />
                            </ListItem>
                        )}
                    </List>
                </Demo>
            </Grid>
        </Box>
    );
}

export default ContactList;
