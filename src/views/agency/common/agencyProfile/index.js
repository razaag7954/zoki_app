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
import { getSpecificAgency, getCurrencyList, getSubPlanList, updateSpecificAgency } from 'crud'
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
import DropZone from "./components/dropzone";

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

export default function AgencyProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const userRole = useSelector(({ user: { user: { systemRole } } }) => systemRole);
  const agencyId = useSelector(({ user: { user: { _agency } } }) => _agency);
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

  useEffect(() => {
    dispatch(setLoading())
    getSpecificAgency(agencyId)
      .then(res => {
        // console.log(res.data.data)
        dispatch(unsetLoading())
        loadValuesHandler(res.data.data.agency)
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

  const loadValuesHandler = (agency) => {
    getCurrencyList()
      .then(res => {
        // console.log(res.data)
        setCurrencyList(res.data.data.currencies)
        setCurrency(agency.currency ? agency.currency : "");
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
    getSubPlanList()
      .then(res => {
        // console.log(res.data)
        setPlanList(res.data.data.subscriptionPlans)
        setSubscriptionPlan(agency.subscription?.plan ? agency.subscription.plan : "");
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
    setBusinessName(agency.businessName ? agency.businessName : "");
    setLogo(agency.logo ? agency.logo : "");
    setPhone(agency.contactInfo.phone ? agency.contactInfo.phone : "");
    setExt(agency.contactInfo.ext ? agency.contactInfo.ext : "");
    setFax(agency.contactInfo.fax ? agency.contactInfo.fax : "");
    setMobile(agency.contactInfo.mobile ? agency.contactInfo.mobile : "");
    setEmail(agency.contactInfo.email ? agency.contactInfo.email : "");
    setUnitNo(agency.address?.unitNo ? agency.address.unitNo : "");
    setStreet(agency.address?.street ? agency.address.street : "");
    setCity(agency.address?.city ? agency.address.city : "");
    setZip(agency.address?.zip ? agency.address.zip : "");
    setState(agency.address?.state ? agency.address.state : "");
    // setLat(agency.address.lat);
    // setLong(agency.address.street);
    setSubscriptionActivationDate(agency.subscription?.activationDate ? agency.subscription.activationDate : null);
    setSubscriptionExpiryDate(agency.subscription?.expiryDate ? agency.subscription.expiryDate : null);
  }

  const updateAgencyHandler = (e) => {
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
      businessName,
      // logo,
      contactInfo: {
        phone,
        // ext,
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
      subscription: {
        plan: subscriptionPlan,
        activationDate: subscriptionActivationDate,
        expiryDate: subscriptionExpiryDate
      }
    }
    if (logo)
      payload['logo'] = logo
    if (ext)
      payload.contactInfo['ext'] = parseInt(ext)
    if (fax)
      payload.contactInfo['fax'] = fax
    dispatch(setLoading())
    updateSpecificAgency(agencyId, payload)
      .then(res => {
        // console.log(res.data)
        enqueueSnackbar('Agency Profile updated successfully.', { variant: 'success' })
        dispatch(unsetLoading())
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/401')
        } else {
          console.log(error.response.data);
          console.log(error.response.status);
          enqueueSnackbar('Unable to update agency profile.', { variant: 'error' })
        }
        dispatch(unsetLoading())
      })
  }

  return (
    <div>
      <form onSubmit={updateAgencyHandler}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={7}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>My Agency</h4>
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
                {userRole !== 'AGENT' && <Button type='submit' className='w-100' color="success" round>
                  Update Profile
                </Button>}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    </div >
  );
}
