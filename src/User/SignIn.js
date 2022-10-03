import React, { useState } from 'react';
import Layout from '../Core/Layout';
import { API } from '../Config';
import { Redirect } from 'react-router-dom';
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


const SignIn = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const signin = (user) => {
        //  console.log(name , email, password);
        return fetch(`${API}/signin`, {
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
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    console.log('user', data)
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true

                        });
                    });
                    alert("Login Successfully completed")
                }
            });
    };
    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
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

    const showLoading = () => (
        loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/dashboard/user" />;
        }

        if (isAuthenticated()) {
            return <Redirect to="/dashboard/user" />;
        }
    }



    return (
        <div>
            <Layout
                title="SignIn"
                description=" SignIn to WebSpero App"
                className="container offset-md-3 col-md-6  offset-md-2"
            >
                {showError()}
                {showLoading()}
                {signUpForm()}
                {redirectUser()}
                {/* {JSON.stringify(values)} */}
            </Layout>
        </div>
    )
}

const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

export const signout = (next) => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem("jwt");
        next();
        return fetch(`${API}/signout`, {
            method: "GET",
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));
    }
};

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }

    if (sessionStorage.getItem("jwt")) {
        return JSON.parse(sessionStorage.getItem("jwt"));
    } else {
        return false;
    }
}

export default SignIn;