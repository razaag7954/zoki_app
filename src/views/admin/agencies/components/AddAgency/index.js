import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "redux/actions";
import { addNewAgency, getCurrencyList, getSubPlanList } from 'crud'
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
import logo_temp from "assets/logo_placeholder.jpg";
import DropZone from "../DropZone";

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

export default function AddNewAgency({ setReload, setRender }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [businessName, setBusinessName] = useState('');
  const [logo, setLogo] = useState('');
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
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [subscriptionPlan, setSubscriptionPlan] = useState('');
  const [subscriptionActivationDate, setSubscriptionActivationDate] = useState(new Date());
  const [subscriptionExpiryDate, setSubscriptionExpiryDate] = useState(new Date());
  const [currency, setCurrency] = useState('');
  const [currencyList, setCurrencyList] = useState([]);
  const [planList, setPlanList] = useState([]);
  const [password, setPassword] = useState('');

  useEffect(() => {
    getCurrencyList()
      .then(res => {
        // console.log(res.data)
        setCurrencyList(res.data.data.currencies)
        getSubPlanList()
          .then(res => {
            // console.log(res.data)
            setPlanList(res.data.data.subscriptionPlans)
          })
          .catch(error => {
            if (error.response.status === 401) {
              history.push('/401')
            } else {
              console.log(error.response.data);
              console.log(error.response.status);
              enqueueSnackbar('Unable to fetch allowed subscription plan list.', { variant: 'error' })
            }
          })
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
  }, [])

  const resetHandler = () => {

    setFirstName('');
    setMiddleName('');
    setLastName('');
    setBusinessName('');
    setLogo('');
    setPhone('');
    setExt('');
    setFax('');
    setMobile('');
    setEmail('');
    setUnitNo('');
    setStreet('');
    setCity('');
    setZip('');
    setState('');
    setSubscriptionPlan('');
    setSubscriptionActivationDate(new Date());
    setSubscriptionExpiryDate(new Date());
    setCurrency('');
    setPassword('');
    setRender('all')
  }

  const createAgencyHandler = (e) => {
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
      lastName,
      businessName,
      contactInfo: {
        phone,
        mobile,
        email
      },
      address: {
        unitNo,
        street,
        city,
        zip,
        state,
      },
      currency,
      password,
      subscription: {
        plan: subscriptionPlan,
        activationDate: subscriptionActivationDate,
        expiryDate: subscriptionExpiryDate
      }
    }
    if (middleName)
      payload['middleName'] = middleName
    if (logo)
      payload['logo'] = logo
    if (ext)
      payload.contactInfo['ext'] = parseInt(ext)
    if (fax)
      payload.contactInfo['fax'] = fax
    dispatch(setLoading())
    addNewAgency(payload)
      .then(res => {
        // console.log(res.data)
        enqueueSnackbar('Success, New Agency Created.', { variant: 'success' })
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
          enqueueSnackbar('Unable to save agency.', { variant: 'error' })
        }
        dispatch(unsetLoading())
      })
  }

  return (
    <div>
      <form onSubmit={createAgencyHandler}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={7}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>Add New Agency</h4>
                <p className={classes.cardCategoryWhite}>Fly with Zoki!</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      className='mt-4 w-100'
                      label="Agency Name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                      disabled={userRole === 'AGENT'}
                    />
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
                      disabled={userRole === 'AGENT'}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Ext"
                      value={ext}
                      onChange={(e) => setExt(e.target.value)}
                      disabled={userRole === 'AGENT'}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Fax"
                      value={fax}
                      onChange={(e) => setFax(e.target.value)}
                      disabled={userRole === 'AGENT'}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                      disabled={userRole === 'AGENT'}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Email"
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={userRole === 'AGENT'}
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
                      disabled={userRole === 'AGENT'}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                      disabled={userRole === 'AGENT'}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      disabled={userRole === 'AGENT'}
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
                      disabled={userRole === 'AGENT'}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      disabled={userRole === 'AGENT'}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={5}>
            <Card profile>
              <CardAvatar profile>
                <img src={logo ? logo : logo_temp} alt="..." style={{ height: 125, width: 125 }} />
              </CardAvatar>
              <CardBody profile>
                {userRole !== 'AGENT' && <DropZone setLogo={setLogo} />}
                <FormControl
                  className='mt-4 w-100'
                >
                  <InputLabel id="select-sub-plan-field" required>Select Subscription Plan</InputLabel>
                  <Select
                    labelId="select-sub-plan-field"
                    value={subscriptionPlan}
                    onChange={(e) => setSubscriptionPlan(e.target.value)}
                    required
                    disabled={userRole === 'AGENT'}
                  >
                    {planList.map((p, i) => {
                      return <MenuItem key={p.key} value={p.value}>{p.key}</MenuItem>
                    })}
                  </Select>
                </FormControl>
                {/* <TextField
                  className='mt-4 w-100'
                  label="Subscription Activation Date"
                  type='date'
                  value={subscriptionActivationDate}
                  onChange={(e) => setSubscriptionActivationDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                /> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className='mt-4 w-100'
                    format="MM/dd/yyyy"
                    label="Subscription Activation Date"
                    value={subscriptionActivationDate}
                    onChange={(date) => setSubscriptionActivationDate(date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    maxDate={new Date()}
                    required
                    disabled={userRole === 'AGENT'}
                  />
                </MuiPickersUtilsProvider>
                {/* <TextField
                  className='mt-4 w-100'
                  label="Subscription Expiry Date"
                  type='date'
                  value={subscriptionExpiryDate}
                  onChange={(e) => setSubscriptionExpiryDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                /> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className='mt-4 w-100'
                    format="MM/dd/yyyy"
                    label="Subscription Expiry Date"
                    value={subscriptionExpiryDate}
                    onChange={(date) => setSubscriptionExpiryDate(date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    maxDate={new Date()}
                    required
                    disabled={userRole === 'AGENT'}
                  />
                </MuiPickersUtilsProvider>
                <FormControl
                  className='my-4 w-100'
                >
                  <InputLabel id="select-currency-field" required>Select Currency</InputLabel>
                  <Select
                    labelId="select-currency-field"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    required
                    disabled={userRole === 'AGENT'}
                  >
                    {currencyList.map((c, i) => {
                      return <MenuItem key={c.key} value={c.value}>{c.key}</MenuItem>
                    })}
                  </Select>
                </FormControl>
                <div className="d-flex w-100 justify-content-around">
                  <Button style={{ width: '45%' }} round onClick={resetHandler}>
                    Cancel
                  </Button>
                  <Button style={{ width: '45%' }} type='submit' color="success" round>
                    Save User
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
