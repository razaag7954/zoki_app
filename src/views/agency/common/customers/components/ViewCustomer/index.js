import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useSnackbar } from 'notistack';
import { useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "redux/actions";
import { getSpecificCustomer } from 'crud'
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

export default function ViewCustomer({ setReload, id, setRender }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
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
  const [language, setLanguage] = useState('');
  const [currency, setCurrency] = useState('');

  useEffect(() => {
    dispatch(setLoading())
    getSpecificCustomer(id)
      .then(res => {
        // console.log(res.data.data.customer)
        loadValuesHandler(res.data.data.customer)
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

  const loadValuesHandler = (customer) => {
    setFirstName(customer.firstName ? customer.firstName : "");
    setMiddleName(customer.middleName ? customer.middleName : "");
    setLastName(customer.lastName ? customer.lastName : "");
    setDP(customer.dp ? customer.dp : "");
    setDOB(customer.dob ? customer.dob : null);
    setGender(customer.gender ? customer.gender : "");
    setPhone(customer.contactInfo.phone ? customer.contactInfo.phone : "");
    setExt(customer.contactInfo.ext ? customer.contactInfo.ext : "");
    setFax(customer.contactInfo.fax ? customer.contactInfo.fax : "");
    setMobile(customer.contactInfo.mobile ? customer.contactInfo.mobile : "");
    setEmail(customer.contactInfo.email ? customer.contactInfo.email : "");
    setUnitNo(customer.address?.unitNo ? customer.address.unitNo : "");
    setStreet(customer.address?.street ? customer.address.street : "");
    setCity(customer.address?.city ? customer.address.city : "");
    setZip(customer.address?.zip ? customer.address.zip : "");
    setState(customer.address?.state ? customer.address.state : "");
    // setLat(user.address.lat);
    // setLong(user.address.street);
    setCurrency(customer.currency ? customer.currency : "");
    setLanguage(customer.language ? customer.language : "");
  }

  return (
    <div>
      <form>
        <GridContainer>
          <GridItem xs={12} sm={12} md={7}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>View Customer</h4>
                <p className={classes.cardCategoryWhite}>Fly with Zoki!</p>
              </CardHeader>
              <CardBody>

                {/* Personal Info */}

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="First Name"
                      value={firstName}
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Middle Name"
                      value={middleName}
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Last Name"
                      value={lastName}
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
                        onChange={(date) => setDOB(dob)}
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
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Ext"
                      value={ext}
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Fax"
                      value={fax}
                      required
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
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Email"
                      type='email'
                      value={email}
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
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Street"
                      value={street}
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="City"
                      value={city}
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
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="State"
                      value={state}
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
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      className='mt-4 w-100'
                      label="Currency"
                      value={currency}
                      required
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      className='my-4 w-100'
                      label="Language"
                      value={language}
                      required
                    />
                  </GridItem>
                </GridContainer>
                <div className="d-flex w-100 justify-content-around">
                  <Button style={{ width: '100%' }} color='success' round onClick={() => setRender('all')}>
                    Go Back
                  </Button>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    </div>
  );
}
