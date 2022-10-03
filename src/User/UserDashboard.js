import React, { useState, useEffect } from 'react';
import Layout from '../Core/Layout';
import { isAuthenticated } from '../User/SignIn';
import FavouriteCollection from '../Core/Dashboard';
import axios from 'axios';
import { API } from '../Config';
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import UpdateProfile from '../Core/UpdateProfile';

const useStyles = makeStyles((theme) => ({
    button: {
        float: "right",
        textTransform: 'capitalize',
        color: "#ffffff",
        backgroundColor: '#008CBA',
        '&:hover': {
            backgroundImage: "linear-gradient(90deg, rgb(31, 112, 193), rgb(0, 0, 0))",
        }
    },
    btn: {
        color: "#ffffff",
        margin: theme.spacing(0.2),
        marginLeft: 1,
        textTransform: 'capitalize',
        backgroundColor: '#F14141',
        '&:hover': {
            backgroundColor: '#F14141',
        }
    },
    closeButton: {
        outline: 'none',
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

const UserDashboard = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [image, setImage] = useState('');

    const {
        user: { _id }
    } = isAuthenticated();

    useEffect(() => {
        axios.get(`${API}/get/user/${_id}`).then((res) => {
            console.log("response", res.data);
            setName(res.data.data.name);
            setEmail(res.data.data.email);
            setPhone(res.data.data.phone);
            setZipCode(res.data.data.zipcode);
            setImage(res.data.data.image);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const userLinks = () => {
        return (
            <div className="card">
                <h3 className="card-header">Personal Information</h3>
                <ul className="list-group">
                    <img src={image} alt={image} height={200} width={150} style={{ marginLeft: '110px' }} />
                    <li className="list-group-item">Name: {name}</li>
                    <li className="list-group-item">Email: {email}</li>
                    <li className="list-group-item">Phone: {phone}</li>
                    <li className="list-group-item">Zip Code: {zipCode}</li>
                    <li className="list-group-item">{"Registered User"}</li>
                    <Button variant="contained" className={classes.button} onClick={() => handleProfileDataOpen(_id)}>
                        Edit Profile
                    </Button>
                </ul>
            </div>
        );
    };

    const handleProfileDataOpen = (id) => {
        console.log('id', id)
        setOpen(true);
    };

    const handleProfileDataClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Layout
                title="Welcome to WebSpero App"
                description="Here you can see 5 Nearest Registered Users from your location, Explore now."
                className="container-fluid"
            >
                <div className="row">
                    <div class="col-sm-4 col-12 mb-3" >
                        {userLinks()}
                    </div>
                    <div className="col-sm-8 col-12">
                        <FavouriteCollection />
                    </div>
                </div>
            </Layout>
            <>
                {/* modal */}
                <Dialog
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle id="customized-dialog-title" >
                        Edit Profile
                        <Tooltip title="Close" arrow>
                            <IconButton aria-label="close" className={classes.closeButton} onClick={handleProfileDataClose} >
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </DialogTitle>
                    <DialogContent dividers>
                        <UpdateProfile id={_id} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleProfileDataClose} className={classes.btn} variant="contained">
                            close
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        </>
    )
}

export default UserDashboard;