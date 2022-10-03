import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  TableCell,
  TableRow,
  Table,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Menu from './Menu';
import axios from 'axios';
import CloseIcon from "@material-ui/icons/Close";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { API } from "../Config";


const useStyles = makeStyles((theme) => ({
  background: {
    height: 250,
    backgroundImage: "linear-gradient(90deg, rgb(31, 112, 193), rgb(0, 0, 0))",
    color: "#ffffff",
  },
  button: {
    float: "right",
    textTransform: 'capitalize',
    color: "#ffffff",
    backgroundColor: '#4CAF50',
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
  card: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 8,
    cursor: 'pointer',
    borderColor: "#e6e6e6",
    boxShadow: '0 10px 30px 0px rgb(0 0 0 / 10%)',
    "&:hover": {
      transform: "scale(1.07)",
      transition: 'all 0.4s'
    },
  },
  media: {
    backgroundImage: "linear-gradient(90deg, rgb(31, 112, 193), rgb(0, 0, 0))",
    height: 150,
    width: "100%",
  },
  cardcontent: {
    marginLeft: 15,
    marginTop: 10,
    fontSize: '16px',
    color: '#2c4887',
    fontWeight: 'bold',
    lineHeight: '20px',
    textTransform: 'capitalize',
  },
  cardcontent1: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 15,
    float: 'right',
    fontSize: '16px',
    color: '#2c4887',
    fontWeight: 400,
    lineHeight: '20px',
  },
  hero: {
    display: "block",
    padding: theme.spacing(3),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 600,
    },
    margin: "auto",
  },
  text: {
    color: "#ffffff !important",
  },

}));

export default function Popular(props) {
  const classes = useStyles();
  const [count, setCount] = useState(false);
  const [postedData, setPostedData] = useState("");
  const [noData, setNoData] = useState(false);
  const [skeleton, setSkeleton] = useState(true);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);


  useEffect(() => {
    axios.get(`${API}/get/userlist`).then((response) => {
      setPostedData(response.data.data);
      setCount(response.data.data.length)
      if (response.data.length <= 0) {
        setTimeout(() => setSkeleton(false), 1500)
      }
    })
  }, []);

  const handleUserDataOpen = (id) => {
    console.log('id', id)
    axios.get(`${API}/get/user/${id}`).then((res) => {
      setUserData(res.data.data);
      console.log("UserData", res.data);
    })
      .catch();
    setOpen(true);
  };

  const handleCloseuserData = () => {
    setOpen(false);
  };

  const ListSkeleton = ({ listsToRender }) => {
    return (
      <>
        {Array(listsToRender)
          .fill(1)
          .map((card, index) => (
            <Grid item xs={12} sm={6} md={3}>
              <div>
                <Skeleton variant="text" width={210} />
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="rect" width={210} height={118} />
              </div>
            </Grid>
          ))}
      </>
    );
  };

  return (
    <div>
      <div>
        <Menu />
      </div>
      <Box
        components={Paper}
        p={4}
        className={classes.background}
        elevation={0}
        square
      >
        <Breadcrumbs
          separator={
            <NavigateNextIcon fontSize="small" className={classes.text} />
          }
          aria-label="breadcrumb"
        >
          <Typography href="/" variant={"p"} className={classes.text}>
            Dashboard
          </Typography>
          <Typography variant={"p"} className={classes.text}>
            {" "}
            All Registered Users
          </Typography>
        </Breadcrumbs>
        <div className={classes.hero}>
          <Typography variant={"h4"} className={classes.text} align="center">
            {" "}
            WebSpero
          </Typography>
          <br />
          <Typography variant={"body1"} align="center" className={classes.text}>
          Webspero is your strategic partner for all your Digital Marketing needs. We’ve added over $2 billion in revenues for our clients globally.
          </Typography>
          <Typography variant={"subtitle2"} align="center" color="secondary">
            No of Users : {count}
          </Typography>
        </div>
      </Box>
      <br />
      <Container>
        <div className={classes.section}>
          <Box className={classes.root} style={{ display: "flex" }}>
            <Grid container item spacing={3} alignItems="stretch" >
              {postedData && postedData.length > 0 ? (
                postedData.map((data) => {
                  return (
                    <Grid item xs={12} sm={6} md={3}>
                      <Card className={classes.card} variant="outlined">
                        <CardMedia
                          component="img"
                          alt="img"
                          image={data.image}
                          className={classes.media}
                        />
                        <Typography variant="h1" component="h1" className={classes.cardcontent}>
                          {data.name}
                        </Typography>
                        <Typography variant="subtitle2" component="p" className={classes.cardcontent1}>
                          {data.vote_average}
                        </Typography>
                        <br />
                        <CardActions>
                          <Button size="small" className={classes.button} onClick={() => handleUserDataOpen(`${(data._id)}`)}>
                            <VisibilityIcon />View
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })
              ) : (
                <>

                  <ListSkeleton listsToRender={8} />

                </>
              )}
            </Grid>
          </Box>
        </div>
      </Container>
      {/* modal */}
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" >
          Review
          <Tooltip title="Close" arrow>
            <IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseuserData} >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent dividers>
          <Container >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Card className={classes.root1}>
                  <CardMedia
                    className={classes.media1}
                    component="img"
                    alt="img"
                    image={userData.image}
                  />
                </Card>
              </Grid>
              <Grid item xs={6}>
                <TableContainer variant={Paper}>
                  <Table size="small" className={classes.table}>
                    <TableRow>
                      <TableCell variant="head"   >User Name</TableCell>
                      <TableCell colSpan={2} >{userData.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">User Email</TableCell>
                      <TableCell>{userData.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">User Phone</TableCell>
                      <TableCell>{userData.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">Zip Code</TableCell>
                      <TableCell>{userData.zipcode}</TableCell>
                    </TableRow>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseuserData} className={classes.btn} variant="contained">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
