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
import { getSpecificAgency, getCurrencyList, getSubPlanList, updateSpecificAgency, deleteAgency } from 'crud'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

export default function EditAgency({ setReload, id, setRender }) {
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
  const [airCommission, setAirCommission] = useState({ type: '', rate: '' });
  const [hotelCommission, setHotelCommission] = useState({ type: '', rate: '' });
  const [busCommission, setBusCommission] = useState({ type: '', rate: '' });
  const [activityCommission, setActivityCommission] = useState({ type: '', rate: '' });
  const [transferCommission, setTransferCommission] = useState({ type: '', rate: '' });
  const [travelPackageCommission, setTravelPackageCommission] = useState({ type: '', rate: '' });

  useEffect(() => {
    dispatch(setLoading())
    getSpecificAgency(id)
      .then(res => {
        console.log(res.data.data)
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
          enqueueSnackbar('Unable to fetch allowed subscription plan list.', { variant: 'error' })
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
    setAirCommission(agency.commission?.air ? agency.commission?.air : { type: '', rate: '' });
    setHotelCommission(agency.commission?.hotel ? agency.commission?.hotel : { type: '', rate: '' });
    setBusCommission(agency.commission?.bus ? agency.commission?.bus : { type: '', rate: '' });
    setActivityCommission(agency.commission?.activity ? agency.commission?.activity : { type: '', rate: '' });
    setTransferCommission(agency.commission?.transfer ? agency.commission?.transfer : { type: '', rate: '' });
    setTravelPackageCommission(agency.commission?.travelPackage ? agency.commission?.travelPackage : { type: '', rate: '' });
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
      },
      commission: {
        air: airCommission,
        hotel: hotelCommission,
        bus: busCommission,
        activity: activityCommission,
        transfer: transferCommission,
        travelPackage: travelPackageCommission
      }
    }
    if (logo)
      payload['logo'] = logo
    if (ext)
      payload.contactInfo['ext'] = parseInt(ext)
    if (fax)
      payload.contactInfo['fax'] = fax
    dispatch(setLoading())
    updateSpecificAgency(id, payload)
      .then(res => {
        // console.log(res.data)
        enqueueSnackbar('Agency updated successfully.', { variant: 'success' })
        dispatch(unsetLoading())
        setRender('all')
        setReload(prev => prev + 1)
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/401')
        } else {
          console.log(error.response.data);
          console.log(error.response.status);
          enqueueSnackbar('Unable to update agency.', { variant: 'error' })
        }
        dispatch(unsetLoading())
      })
  }

  const deleteHandler = () => {
    dispatch(setLoading())
    deleteAgency(id)
      .then(res => {
        // console.log(res.data)
        enqueueSnackbar('Agency delete successfully.', { variant: 'success' })
        dispatch(unsetLoading())
        setRender('all')
        setReload(prev => prev + 1)
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/401')
        } else {
          console.log(error.response.data);
          console.log(error.response.status);
          enqueueSnackbar('Unable to delete agency.', { variant: 'error' })
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
                <h4 className={classes.cardTitleWhite}>Edit Agency</h4>
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
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Ext"
                      value={ext}
                      onChange={(e) => setExt(e.target.value)}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Fax"
                      value={fax}
                      onChange={(e) => setFax(e.target.value)}
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

                <hr className="my-4" />

                <h4>Payment & Commissions</h4>

                <div className="d-flex mt-4 w-100 align-items-center justify-content-between">
                  <p style={{ fontSize: 18, fontWeight: 'bold' }} className="mb-0 w-25">Air: </p>
                  <RadioGroup className="w-50" value={airCommission.type} onChange={(e) => {
                    const temp = { type: e.target.value, rate: airCommission.rate }
                    setAirCommission(temp)
                  }} row name="air">
                    <FormControlLabel className="m-0 p-0" value="FLAT" control={<Radio required color="primary" />} label="Flat" />
                    <FormControlLabel className="m-0 p-0" value="PERCENTAGE" control={<Radio required color="primary" />} label="Percentage" />
                  </RadioGroup>
                  <TextField
                    label="Value"
                    className="w-25"
                    value={airCommission.rate}
                    onChange={(e) => {
                      const temp = { type: airCommission.type, rate: e.target.value }
                      setAirCommission(temp)
                    }}
                    type='number'
                    required
                  />
                </div>
                <div className="d-flex mt-2 w-100 align-items-center justify-content-between">
                  <p style={{ fontSize: 18, fontWeight: 'bold' }} className="mb-0 w-25">Hotel: </p>
                  <RadioGroup className="w-50" value={hotelCommission.type} onChange={(e) => {
                    const temp = { type: e.target.value, rate: hotelCommission.rate }
                    setHotelCommission(temp)
                  }} row name="hotel">
                    <FormControlLabel className="m-0 p-0" value="FLAT" control={<Radio required color="primary" />} label="Flat" />
                    <FormControlLabel className="m-0 p-0" value="PERCENTAGE" control={<Radio required color="primary" />} label="Percentage" />
                  </RadioGroup>
                  <TextField
                    label="Value"
                    className="w-25"
                    value={hotelCommission.rate}
                    onChange={(e) => {
                      const temp = { type: hotelCommission.type, rate: e.target.value }
                      setHotelCommission(temp)
                    }}
                    type='number'
                    required
                  />
                </div>
                <div className="d-flex mt-2 w-100 align-items-center justify-content-between">
                  <p style={{ fontSize: 18, fontWeight: 'bold' }} className="mb-0 w-25">Bus: </p>
                  <RadioGroup className="w-50" value={busCommission.type} onChange={(e) => {
                    const temp = { type: e.target.value, rate: busCommission.rate }
                    setBusCommission(temp)
                  }} row name="bus">
                    <FormControlLabel className="m-0 p-0" value="FLAT" control={<Radio required color="primary" />} label="Flat" />
                    <FormControlLabel className="m-0 p-0" value="PERCENTAGE" control={<Radio required color="primary" />} label="Percentage" />
                  </RadioGroup>
                  <TextField
                    label="Value"
                    className="w-25"
                    value={busCommission.rate}
                    onChange={(e) => {
                      const temp = { type: busCommission.type, rate: e.target.value }
                      setBusCommission(temp)
                    }}
                    type='number'
                    required
                  />
                </div>
                <div className="d-flex mt-2 w-100 align-items-center justify-content-between">
                  <p style={{ fontSize: 18, fontWeight: 'bold' }} className="mb-0 w-25">Activity: </p>
                  <RadioGroup className="w-50" value={activityCommission.type} onChange={(e) => {
                    const temp = { type: e.target.value, rate: activityCommission.rate }
                    setActivityCommission(temp)
                  }} row name="activity">
                    <FormControlLabel className="m-0 p-0" value="FLAT" control={<Radio required color="primary" />} label="Flat" />
                    <FormControlLabel className="m-0 p-0" value="PERCENTAGE" control={<Radio required color="primary" />} label="Percentage" />
                  </RadioGroup>
                  <TextField
                    label="Value"
                    className="w-25"
                    value={activityCommission.rate}
                    onChange={(e) => {
                      const temp = { type: activityCommission.type, rate: e.target.value }
                      setActivityCommission(temp)
                    }}
                    type='number'
                    required
                  />
                </div>
                <div className="d-flex mt-2 w-100 align-items-center justify-content-between">
                  <p style={{ fontSize: 18, fontWeight: 'bold' }} className="mb-0 w-25">Transfer: </p>
                  <RadioGroup className="w-50" value={transferCommission.type} onChange={(e) => {
                    const temp = { type: e.target.value, rate: transferCommission.rate }
                    setTransferCommission(temp)
                  }} row name="transfer">
                    <FormControlLabel className="m-0 p-0" value="FLAT" control={<Radio required color="primary" />} label="Flat" />
                    <FormControlLabel className="m-0 p-0" value="PERCENTAGE" control={<Radio required color="primary" />} label="Percentage" />
                  </RadioGroup>
                  <TextField
                    label="Value"
                    className="w-25"
                    value={transferCommission.rate}
                    onChange={(e) => {
                      const temp = { type: transferCommission.type, rate: e.target.value }
                      setTransferCommission(temp)
                    }}
                    type='number'
                    required
                  />
                </div>
                <div className="d-flex mt-2 w-100 align-items-center justify-content-between">
                  <p style={{ fontSize: 18, fontWeight: 'bold' }} className="mb-0 w-25">Travel Package: </p>
                  <RadioGroup className="w-50" value={travelPackageCommission.type} onChange={(e) => {
                    const temp = { type: e.target.value, rate: travelPackageCommission.rate }
                    setTravelPackageCommission(temp)
                  }} row name="travelPackage">
                    <FormControlLabel className="m-0 p-0" value="FLAT" control={<Radio required color="primary" />} label="Flat" />
                    <FormControlLabel className="m-0 p-0" value="PERCENTAGE" control={<Radio required color="primary" />} label="Percentage" />
                  </RadioGroup>
                  <TextField
                    label="Value"
                    className="w-25"
                    value={travelPackageCommission.rate}
                    onChange={(e) => {
                      const temp = { type: travelPackageCommission.type, rate: e.target.value }
                      setTravelPackageCommission(temp)
                    }}
                    type='number'
                    required
                  />
                </div>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={5}>
            <Card profile>
              <CardAvatar profile>
                <img src={logo ? logo : logo_temp} alt="..." style={{ height: 125, width: 125 }} />
              </CardAvatar>
              <CardBody profile>
                <DropZone setLogo={setLogo} />
                <FormControl
                  className='mt-4 w-100'
                >
                  <InputLabel id="select-sub-plan-field" required>Select Subscription Plan</InputLabel>
                  <Select
                    labelId="select-sub-plan-field"
                    value={subscriptionPlan}
                    onChange={(e) => setSubscriptionPlan(e.target.value)}
                    required
                  >
                    {planList.map((p, i) => {
                      return <MenuItem key={p.key} value={p.value}>{p.key}</MenuItem>
                    })}
                  </Select>
                </FormControl>
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
                    // minDate={new Date()}
                    required
                  />
                </MuiPickersUtilsProvider>
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
                    // minDate={new Date()}
                    required
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
                  >
                    {currencyList.map((c, i) => {
                      return <MenuItem key={c.key} value={c.value}>{c.key}</MenuItem>
                    })}
                  </Select>
                </FormControl>
                <div className="d-flex w-100 justify-content-around">
                  <Button style={{ width: '32%' }} round onClick={() => setRender('all')}>
                    Cancel
                  </Button>
                  <Button style={{ width: '32%' }} color="danger" onClick={deleteHandler} round>
                    Delete
                  </Button>
                  <Button style={{ width: '32%' }} type='submit' color="success" round>
                    Update
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
