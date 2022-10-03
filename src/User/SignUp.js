import React, { useState } from 'react';
import { API } from '../Config';
import { Link } from 'react-router-dom';
import Layout from '../Core/Layout';
import { CLOUDINARY_URL } from "../Config";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        textTransform: 'capitalize',
        color: "#ffffff",
        backgroundColor: '#008CBA',
        '&:hover': {
            backgroundImage: "linear-gradient(90deg, rgb(31, 112, 193), rgb(0, 0, 0))",
        }
    },
}));


const SignUp = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        zipcode: '',
        error: '',
        success: false
    });

    const { name, email, password, phone, zipcode, success, error } = values
    const [image, setImage] = useState('')
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const signup = (user) => {
        //  console.log(name , email, password);
        return fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json()
            })
            .catch(err => {
                console.log(err)
            })

    }
    const handleImage = async (e) => {
        const formData = new FormData();
        const image = e.target.files;
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
        setImage(img)
        console.log("image link", img)
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false })
        console.log(name, email, password, phone, zipcode, image)
        signup({ name, email, password, phone, zipcode, image })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        phone: "",
                        zipcode: "",
                        image: "",
                        error: "",
                        success: true
                    })
                }
            })
    }
    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <div className="form-group">
                <label className="text-muted">Phone</label>
                <input onChange={handleChange('phone')} type="number" className="form-control" value={phone} />
            </div>
            <div className="form-group">
                <label className="text-muted">ZipCode</label>
                <input onChange={handleChange('zipcode')} type="number" className="form-control" value={zipcode} />
            </div>
            <div className="form-group">
                <label className="text-muted">Profile Image</label>
                <input onChange={handleImage} type="file" className="form-control" />
            </div>
            <Button variant="contained" className={classes.button} onClick={clickSubmit} type="submit" >
              Submit
            </Button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. please <Link to="/SignIn">Signin</Link>
        </div>
    )

    return (
        <div>
            <Layout
                title="SignUp"
                description=" SignUp Node React WebSpero App"
                className="container offset-md-3 col-md-6  offset-md-2"
            >
                {showError()}
                {showSuccess()}
                {signUpForm()}
                {/* {JSON.stringify(values)} */}
            </Layout>

        </div>
    )
}

export default SignUp;