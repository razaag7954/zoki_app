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
import { getSpecificVoucher, getCurrencyList, deleteVoucher, updateSpecificVoucher } from 'crud'
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
import CardBody from "components/Card/CardBody.js";

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

export default function EditVoucher({ setReload, id, setRender }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [description, setDescription] = useState('');
  const [effectiveDate, setEffectiveDate] = useState(new Date());
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [status, setStatus] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');
  const [currency, setCurrency] = useState('');
  const [currencyList, setCurrencyList] = useState([]);

  useEffect(() => {
    dispatch(setLoading())
    getSpecificVoucher(id)
      .then(res => {
        // console.log(res.data.data.voucher)
        loadValuesHandler(res.data.data.voucher)
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

  const loadValuesHandler = (voucher) => {
    getCurrencyList()
      .then(res => {
        // console.log(res.data)
        setCurrencyList(res.data.data.currencies)
        setCurrency(voucher.currency ? voucher.currency : "");
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
    setDescription(voucher.description ? voucher.description : "");
    setEffectiveDate(voucher.effectiveDate ? voucher.effectiveDate : null);
    setExpiryDate(voucher.expiryDate ? voucher.expiryDate : null);
    setMaxDiscount(voucher.maxDiscount ? voucher.maxDiscount : "");
    setCurrency(voucher.currency ? voucher.currency : "");
    setStatus(voucher.status ? voucher.status : "");
  }

  const updateVoucherHandler = (e) => {
    e.preventDefault()
    if (parseInt(maxDiscount) <= 0) {
      enqueueSnackbar('Discount must be greater than 0', { variant: 'info' })
      return
    }
    const payload = {
      description,
      effectiveDate,
      expiryDate,
      maxDiscount,
      currency,
      status
    }
    dispatch(setLoading())
    updateSpecificVoucher(id, payload)
      .then(res => {
        // console.log(res.data)
        enqueueSnackbar('Voucher updated successfully.', { variant: 'success' })
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
          enqueueSnackbar('Unable to update voucher.', { variant: 'error' })
        }
        dispatch(unsetLoading())
      })
  }

  const deleteHandler = () => {
    dispatch(setLoading())
    deleteVoucher(id)
      .then(res => {
        // console.log(res.data)
        enqueueSnackbar('Voucher delete successfully.', { variant: 'success' })
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
          enqueueSnackbar('Unable to delete voucher.', { variant: 'error' })
        }
        dispatch(unsetLoading())
      })
  }

  return (
    <div>
      <form onSubmit={updateVoucherHandler}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>Edit Voucher</h4>
                <p className={classes.cardCategoryWhite}>Fly with Zoki!</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      className='mt-4 w-100'
                      label="Description"
                      value={description}
                      // onChange={(e) => setDescription(e.target.value)}
                      required
                      disabled
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      className='mt-4 w-100'
                      label="Max Discount"
                      value={maxDiscount}
                      // onChange={(e) => setMaxDiscount(e.target.value)}
                      required
                      disabled
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    {/* <TextField
                      className='mt-4 w-100'
                      label="Effective Date"
                      type='date'
                      value={effectiveDate}
                      // onChange={(e) => setEffectiveDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      disabled
                    /> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className='mt-4 w-100'
                        format="MM/dd/yyyy"
                        label="Effective Date"
                        value={effectiveDate}
                        onChange={(date) => setEffectiveDate(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        required
                        disabled
                      />
                    </MuiPickersUtilsProvider>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    {/* <TextField
                      className='mt-4 w-100'
                      label="Expiry Date"
                      type='date'
                      value={expiryDate}
                      // onChange={(e) => setExpiryDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      disabled
                    /> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className='mt-4 w-100'
                        format="MM/dd/yyyy"
                        label="Expiry Date"
                        value={expiryDate}
                        onChange={(date) => setExpiryDate(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        required
                        disabled
                      />
                    </MuiPickersUtilsProvider>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl
                      className='mt-4 w-100'
                    >
                      <InputLabel id="select-currency-field" required>Select Currency</InputLabel>
                      <Select
                        labelId="select-currency-field"
                        value={currency}
                        // onChange={(e) => setCurrency(e.target.value)}
                        required
                        disabled
                      >
                        {currencyList.map((c, i) => {
                          return <MenuItem key={c.key} value={c.value}>{c.key}</MenuItem>
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl
                      className='mt-4 w-100'
                    >
                      <InputLabel id="select-status-field" required>Select Status</InputLabel>
                      <Select
                        labelId="select-status-field"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                      >
                        <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                        <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <div className="d-flex mt-4 w-100 justify-content-around">
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
    </div>
  );
}
