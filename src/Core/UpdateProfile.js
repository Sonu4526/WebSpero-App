import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Fab, Box, Card, CardMedia, IconButton, Button } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { CLOUDINARY_URL, API } from "../Config";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(() => ({
    card: {
        height: 150,
        width: 250,
        borderRadius: "10%",
    },
    media: {
        height: 150,
        width: 250,
        borderRadius: "10%",
    },
    image: {
        height: 80,
    },
    upload: {
        marginTop: "-56px",
        float: "right"
    },
    button: {
        float: "right",
        textTransform: 'capitalize',
        color: "#ffffff",
        backgroundColor: '#008CBA',
        '&:hover': {
            backgroundImage: "linear-gradient(90deg, rgb(31, 112, 193), rgb(0, 0, 0))",
        }
    },
}));


const UpdateProfile = (props) => {
    const classes = useStyles();
    let jwt = JSON.parse(sessionStorage.getItem('jwt'))
    let token = jwt.token
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [image, setImage] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get(`${API}/get/user/${props.id}`).then((res) => {
            console.log("response", res.data);
            setName(res.data.data.name);
            setEmail(res.data.data.email);
            setPhone(res.data.data.phone);
            setZipCode(res.data.data.zipcode);
            setImage(res.data.data.image);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        window.location.reload();
    };

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = () => {
        const details = {
            name: name,
            email: email,
            phone: phone,
            zipcode: zipCode,
            image: image,
        }
        axios.post(`${API}/update/user/${props.id}?token=${token}`, details).then((res) => {
            console.log(res.data);
        })
        setOpen(true);
    }

    const handleImage = async (e) => {
        // Uploading image in cloudinary
        const image = e.target.files;
        const formData = new FormData();
        formData.append("file", image[0]);
        formData.append("upload_preset", "mywork");

        const response = await fetch(CLOUDINARY_URL,
            {
                method: 'POST',
                body: formData
            })
        const file = await response.json()
        console.log(file)
        const img = file.secure_url;
        console.log("image link", img)
        setImage(img);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} lg={12}>
                        <TextField
                            margin="dense"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined"
                            fullWidth
                            name="name"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputRef={register({
                                required: "Please enter name",
                            })}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <TextField
                            margin="dense"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                            fullWidth
                            name="email"
                            type="email"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputRef={register({
                                required: "Please enter email",
                            })}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <TextField
                            margin="dense"
                            label="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            variant="outlined"
                            fullWidth
                            name="phone"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputRef={register({
                                required: "Please enter phone number",
                            })}
                            error={Boolean(errors.phone)}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <TextField
                            margin="dense"
                            label="Zip Code"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            variant="outlined"
                            fullWidth
                            name="zipcode"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputRef={register({
                                required: "Please enter zip code",
                            })}
                            error={Boolean(errors.zipcode)}
                            helperText={errors.zipcode?.message}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} xs={12} sm={12} >
                        <Box mb={2}>
                            <Card className={classes.card}>
                                <CardMedia component="img"
                                    alt="img" image={image} className={classes.media} />
                                <IconButton component="label" className={classes.upload}>
                                    <input type="file" name="bannerImage" onChange={handleImage} hidden />
                                    <Fab color="primary" size="small" component="span" ><PhotoCamera /></Fab>
                                </IconButton>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid xs={12} sm={12}>
                        <Button variant="contained" color="primary" type="submit" className={classes.button} fullWidth>
                            Update Profile
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} >
                <Alert severity="success">
                    Your profile has been successfully updated
                </Alert>
            </Snackbar>
        </>
    )
}

export default UpdateProfile;