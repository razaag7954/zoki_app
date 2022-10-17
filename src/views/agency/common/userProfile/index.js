import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from 'notistack';
import { setLoading, unsetLoading } from "redux/actions";
import { getSpecificUser, getCurrencyList, getLanguageList, updateSpecificUser } from 'crud'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import DropZone from "./components/dropzone";
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

export default function UserProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const userId = useSelector(({ user: { user: { sub } } }) => sub);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dp, setDP] = useState('');
  const [dob, setDOB] = useState(new Date());
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [ext, setExt] = useState('');
  const [fax, setFax] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [unitNo, setUnitNo] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');
  // const [lat, setLat] = useState(0);
  // const [long, setLong] = useState(0);
  const [currencyList, setCurrencyList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [currency, setCurrency] = useState('');
  const [language, setLanguage] = useState('');

  useEffect(() => {
    dispatch(setLoading())
    getSpecificUser(userId)
      .then(res => {
        // console.log(res.data.data.user)
        loadValuesHandler(res.data.data.user)
        dispatch(unsetLoading())
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/401')
        } else {
          console.log(error.response.data);
          console.log(error.response.status);
          enqueueSnackbar('Unable to fetch data.', { variant: 'error' })
        }
        dispatch(unsetLoading())
      })
  }, [])

  const loadValuesHandler = (user) => {
    getCurrencyList()
      .then(res => {
        // console.log(res.data)
        setCurrencyList(res.data.data.currencies)
        setCurrency(user.currency ? user.currency : "");
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/401')
        } else {
          console.log(error.response.data);
          console.log(error.response.status);
          enqueueSnackbar('Unable to fetch allowed currencies list.', { variant: 'error' })
        }
      })
    getLanguageList()
      .then(res => {
        // console.log(res.data)
        setLanguageList(res.data.data.languages)
        setLanguage(user.language ? user.language : "");
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/401')
        } else {
          console.log(error.response.data);
          console.log(error.response.status);
          enqueueSnackbar('Unable to fetch allowed languages list.', { variant: 'error' })
        }
      })
    setFirstName(user.firstName ? user.firstName : "");
    setMiddleName(user.middleName ? user.middleName : "");
    setLastName(user.lastName ? user.lastName : "");
    setDP(user.dp ? user.dp : "");
    setDOB(user.dob ? user.dob : null);
    setGender(user.gender ? user.gender : "");
    setPhone(user.contactInfo.phone ? user.contactInfo.phone : "");
    setExt(user.contactInfo.ext ? user.contactInfo.ext : "");
    setFax(user.contactInfo.fax ? user.contactInfo.fax : "");
    setMobile(user.contactInfo.mobile ? user.contactInfo.mobile : "");
    setEmail(user.contactInfo.email ? user.contactInfo.email : "");
    setUnitNo(user.address?.unitNo ? user.address.unitNo : "");
    setStreet(user.address?.street ? user.address.street : "");
    setCity(user.address?.city ? user.address.city : "");
    setZip(user.address?.zip ? user.address.zip : "");
    setState(user.address?.state ? user.address.state : "");
    // setLat(user.address.lat);
    // setLong(user.address.street);
  }

  const updateUserHandler = (e) => {
    e.preventDefault()
    if (!zip || zip.length < 5) {
      enqueueSnackbar('Zip Code must be at least 5 character long', { variant: 'info' })
      return
    }
    if (parseInt(ext) > 999) {
      enqueueSnackbar('Ext must be less than or equal to 999', { variant: 'info' })
      return
    }
    const payload = {
      firstName,
      // middleName,
      lastName,
      // dp,
      dob,
      gender,
      contactInfo: {
        phone,
        // ext: parseInt(ext),
        // fax,
        mobile,
        email
      },
      address: {
        unitNo,
        street,
        city,
        zip,
        state,
        // coordinates: {
        //   lat,
        //   long
        // }
      },
      currency,
      language
    }
    if (middleName)
      payload['middleName'] = middleName
    if (dp)
      payload['dp'] = dp
    if (ext)
      payload.contactInfo['ext'] = parseInt(ext)
    if (fax)
      payload.contactInfo['fax'] = fax
    dispatch(setLoading())
    updateSpecificUser(userId, payload)
      .then(res => {
        // console.log(res.data)
        enqueueSnackbar('Profile updated successfully.', { variant: 'success' })
        dispatch(unsetLoading())
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/401')
        } else {
          console.log(error.response.data);
          console.log(error.response.status);
          enqueueSnackbar('Unable to update profile.', { variant: 'error' })
        }
        dispatch(unsetLoading())
      })
  }

  return (
    <div>
      <form onSubmit={updateUserHandler}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={7}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>My Profile</h4>
                <p className={classes.cardCategoryWhite}>Fly with Zoki!</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Middle Name"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                    // required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    {/* <TextField
                      className='mt-4 w-100'
                      label="Date of Birth"
                      type='date'
                      value={dob}
                      onChange={(e) => setDOB(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    /> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className='mt-4 w-100'
                        format="MM/dd/yyyy"
                        label="Date of Birth"
                        value={dob}
                        onChange={(date) => setDOB(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        maxDate={new Date()}
                        required
                      />
                    </MuiPickersUtilsProvider>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl
                      className='mt-4 w-100'
                    >
                      <InputLabel id="select-gender-field" required>Gender</InputLabel>
                      <Select
                        labelId="select-gender-field"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <MenuItem value="FEMALE">Female</MenuItem>
                        <MenuItem value="MALE">Male</MenuItem>
                        <MenuItem value="NON-BINARY">Non-Binary</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>

                {/* Contact Info */}

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Ext"
                      value={ext}
                      onChange={(e) => setExt(e.target.value)}
                    // required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Fax"
                      value={fax}
                      onChange={(e) => setFax(e.target.value)}
                    // required
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Mobile"
                      value={mobile}
                      required
                      disabled
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Email"
                      type='email'
                      value={email}
                      required
                      disabled
                    />
                  </GridItem>
                </GridContainer>

                {/* Address */}

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Unit No."
                      value={unitNo}
                      onChange={(e) => setUnitNo(e.target.value)}
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Zip"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
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
                <img src={dp ? dp : avatar} alt="..." style={{ height: 125, width: 125 }} />
              </CardAvatar>
              <CardBody profile>
                <DropZone setDP={setDP} />
                <FormControl
                  className='mt-4 w-100'
                >
                  <InputLabel id="select-currency-field" required>Select Currency</InputLabel>
                  <Select
                    labelId="select-currency-field"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    required
                  >
                    {currencyList.map((c, i) => {
                      return <MenuItem key={c.key} value={c.value}>{c.key}</MenuItem>
                    })}
                  </Select>
                </FormControl>
                <FormControl
                  className='my-4 w-100'
                >
                  <InputLabel id="select-lang-field" required>Select Language</InputLabel>
                  <Select
                    labelId="select-lang-field"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    required
                  >
                    {languageList.map((l, i) => {
                      return <MenuItem key={l.key} value={l.value}>{l.key}</MenuItem>
                    })}
                  </Select>
                </FormControl>
                <Button type='submit' className='w-100' color="success" round>
                  Update Profile
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    </div >
  );
}
