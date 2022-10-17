import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from 'notistack';
import { setLoading, unsetLoading } from "redux/actions";
import { getSpecificWallet } from 'crud'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AmountForm from "./components/amountForm";
import StripeClient from 'components/Stripe';
import PaymentHistory from "./components/paymentHistory";

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

export default function Wallet() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const agencyId = useSelector(({ user: { user: { _agency } } }) => _agency);
  const { enqueueSnackbar } = useSnackbar();
  const [view, setView] = useState('wallet');
  const [amount, setAmount] = useState('')
  const [checkout, setCheckout] = useState(false)
  const [balance, setBalance] = useState(0)
  // const [logs, setLogs] = useState([])

  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get(
      "redirect_status"
    );
    if (status) {
      switch (status) {
        case "succeeded":
          enqueueSnackbar("Payment succeeded!", { variant: 'success' })
          break;
        case "processing":
          enqueueSnackbar("Your payment is processing.", { variant: 'info' })
          break;
        case "requires_payment_method":
          enqueueSnackbar("Your payment was not successful, please try again.", { variant: 'error' })
          break;
        default:
          enqueueSnackbar("Something went wrong.", { variant: 'error' })
          break;
      }
    }
    dispatch(setLoading())
    getSpecificWallet(agencyId)
      .then(res => {
        console.log(res.data.data.wallet)
        setBalance(res.data.data.wallet.balance)
        // setLogs(res.data.data.wallet.transactions)
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

  if (view === 'history')
    return (
      <PaymentHistory id={agencyId} setView={setView} />
    )
  else
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={7}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>Add Balance</h4>
                <p className={classes.cardCategoryWhite}>Fly with Zoki!</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {checkout ?
                      <StripeClient amount={amount} setCheckout={setCheckout} /> :
                      <AmountForm amount={amount} setAmount={setAmount} setCheckout={setCheckout} />}
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={5}>
            <Card profile style={{ backgroundColor: 'rgba(252,252,252,1)' }}>
              <CardBody profile>
                <div className="py-5">
                  <h5>Current Balance</h5>
                  <h1 style={{ fontWeight: 'bold', fontSize: 72, color: '#9C8E35' }}>
                    {`${balance} USD`}
                  </h1>
                </div>
                <Button onClick={() => setView('history')} className='w-100' color="info" round>
                  View Payment History
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div >
    );
}
