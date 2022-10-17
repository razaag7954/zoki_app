import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "redux/actions";
import { addNewPackage, getCurrencyList, getLanguageList } from 'crud'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import DropZone from "../DropZone";
import avatar from "assets/avatar.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function AddNewPackage({ setReload, setRender }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [persons, setPersons] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('');
  const [nights, setNights] = useState('');
  const [featuredImg, setFeaturedImg] = useState('');
  const [price, setPrice] = useState('');
  const [agencies, setAgencies] = useState([]);
  const [tags, setTags] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // getCurrencyList()
    //   .then(res => {
    //     // console.log(res.data)
    //     setCurrencyList(res.data.data.currencies)
    //     getLanguageList()
    //       .then(res => {
    //         // console.log(res.data)
    //         setLanguageList(res.data.data.languages)
    //       })
    //       .catch(error => {
    //         if (error.response.status === 401) {
    //           history.push('/401')
    //         } else {
    //           console.log(error.response.data);
    //           console.log(error.response.status);
    //           enqueueSnackbar('Unable to fetch allowed languages list.', { variant: 'error' })
    //         }
    //       })
    //   })
    //   .catch(error => {
    //     if (error.response.status === 401) {
    //       history.push('/401')
    //     } else {
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       enqueueSnackbar('Unable to fetch allowed currencies list.', { variant: 'error' })
    //     }
    //   })
  }, [])

  const resetHandler = () => {
    setName('');
    setDescription('');
    setPersons('');
    setOrigin('');
    setDestination('');
    setDays('');
    setNights('');
    setFeaturedImg('');
    setPrice('');
    setAgencies([]);
    setTags([]);
    setActivities([]);
    setRender('all');
  }

  const createPackageHandler = (e) => {
    e.preventDefault()
    if (!featuredImg) {
      enqueueSnackbar('Please upload featured image.', { variant: 'info' })
      return
    }
    const payload = {
      name,
      description,
      noOfPersons: parseInt(persons),
      origin,
      destination,
      days: parseInt(days),
      nights: parseInt(nights),
      featuredImg,
      price,
      tags
    }
    if (agencies.length)
      payload['_agencies'] = agencies
    if (activities.length)
      payload['activities'] = activities
    dispatch(setLoading())
    addNewPackage(payload)
      .then(res => {
        // console.log(res.data)
        enqueueSnackbar('Success, New Package Created.', { variant: 'success' })
        dispatch(unsetLoading())
        resetHandler()
        setReload(prev => prev + 1)
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/401')
        } else {
          console.log(error.response.data);
          console.log(error.response.status);
          enqueueSnackbar('Unable to save package.', { variant: 'error' })
        }
        dispatch(unsetLoading())
      })
  }

  const handleAgencyChange = (event) => {
    setAgencies(event.target.value);
  };

  const handleActivityChange = (event) => {
    setActivities(event.target.value);
  };

  const handleTagChange = (event) => {
    setTags(event.target.value);
  };

  return (
    <div>
      <form onSubmit={createPackageHandler}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={7}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>Add New Package</h4>
                <p className={classes.cardCategoryWhite}>Fly with Zoki!</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      className='mt-4 w-100'
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      className='mt-4 w-100'
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Origin"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="No. of Persons"
                      value={persons}
                      type='number'
                      onChange={(e) => setPersons(e.target.value)}
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Days"
                      value={days}
                      type='number'
                      onChange={(e) => setDays(e.target.value)}
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Nights"
                      value={nights}
                      type='number'
                      onChange={(e) => setNights(e.target.value)}
                      required
                    />
                  </GridItem>
                </GridContainer>

              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={5}>
            <Card profile>
              <CardAvatar profile>
                <img src={featuredImg ? featuredImg : avatar} alt="..." style={{ height: 125, width: 125 }} />
              </CardAvatar>
              <CardBody profile>
                <DropZone setFeaturedImg={setFeaturedImg} />

                <FormControl
                  className='mt-4 w-100'
                >
                  <InputLabel id="select-agencies-field">Select Agencies</InputLabel>
                  <Select
                    labelId="select-agencies-field"
                    multiple
                    value={agencies}
                    onChange={handleAgencyChange}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    <MenuItem value="ADMIN">
                      <Checkbox checked={agencies.indexOf("ADMIN") > -1} />
                      <ListItemText primary={"ADMIN"} />
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  className='mt-4 w-100'
                >
                  <InputLabel id="select-activities-field">Select Activities</InputLabel>
                  <Select
                    labelId="select-activities-field"
                    multiple
                    value={activities}
                    onChange={handleActivityChange}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    <MenuItem value="ADMIN">
                      <Checkbox checked={activities.indexOf("ADMIN") > -1} />
                      <ListItemText primary={"ADMIN"} />
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  className='my-4 w-100'
                >
                  <InputLabel id="select-tags-field" required>Select Tags</InputLabel>
                  <Select
                    labelId="select-tags-field"
                    multiple
                    value={tags}
                    onChange={handleTagChange}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    required
                  >
                    <MenuItem value="ADMIN">
                      <Checkbox checked={tags.indexOf("ADMIN") > -1} />
                      <ListItemText primary={"ADMIN"} />
                    </MenuItem>
                  </Select>
                </FormControl>

                <div className="d-flex w-100 justify-content-around">
                  <Button style={{ width: '45%' }} round onClick={resetHandler}>
                    Cancel
                  </Button>
                  <Button style={{ width: '45%' }} type='submit' color="success" round>
                    Save Package
                  </Button>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    </div >
  );
}
