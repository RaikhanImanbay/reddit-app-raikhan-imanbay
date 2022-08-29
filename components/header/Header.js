import React, { useState } from "react";
import '@fontsource/roboto';
import { AppBar, Toolbar } from "@material-ui/core";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import SignUp from "../signup/SignUp";
import SignIn from "../signin/SignIn";


export default function Header() {
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [userSignedIn, setUserSignedIn] = useState(false);
    
    async function handleSignIn() {
        setOpenSignIn(true);
    }
    async function handleSignUp() {
        setOpenSignUp(true);
    }

    function handleClose() {
        setOpenSignUp(false);
        setOpenSignIn(false);
    }

    function handleLogOut() {
        setUserSignedIn(false);
    }

    function onUserRegistered(token) {
        if (token) {
            setOpenSignUp(false);
            alert('Success! You have signed up!');
        }
    }

    function onUserSignedIn(token) {
        if (token) {
            setOpenSignIn(false);
            setUserSignedIn(true);
            alert('Success! You have signed in!');
        }
    }

    const displayDesktop = () => {
        return (
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Reddit-like app
                </Typography>
                {
                    !userSignedIn && (
                        <div>
                            <Button color="inherit" onClick={handleSignUp}>Sign up</Button>
                            <Button color="inherit" onClick={handleSignIn}>Login</Button>
                        </div>
                    )
                }
                {userSignedIn && <Button color="inherit" onClick={handleLogOut}>Log out</Button>}
            </Toolbar>
        );
    };

    return (
        <header>
            <AppBar>{displayDesktop()}</AppBar>
            <Dialog open={openSignUp} onClose={handleClose}>
                <DialogContent>
                    <SignUp onUserRegistered={onUserRegistered} />
                </DialogContent>
            </Dialog>
            <Dialog open={openSignIn} onClose={handleClose}>
                <DialogContent>
                    <SignIn onUserSignedIn={onUserSignedIn} />
                </DialogContent>
            </Dialog>
        </header>
    );
}
