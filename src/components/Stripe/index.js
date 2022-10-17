import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from 'notistack';
import { unsetLoading } from "redux/actions";
import { getClientSecret } from "crud";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./components/checkoutForm";
import css from "./index.module.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
export default function Stripe({ amount, setCheckout }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [clientSecret, setClientSecret] = useState("");
  const [stripe, setStripe] = useState("");

  useEffect(async () => {
    const stripePromise = await loadStripe("pk_test_51KznANBTeMLYEsdEW2DleN8Vvljz20cQR9Z0mxOXjPFIohwQHgIt84PPQns62cfA6DNEYWFPHbxuoKNTzhrBRNmi003KhbgE9m");
    setStripe(stripePromise)
    // Create PaymentIntent as soon as the page loads
    getClientSecret({ amount })
      .then(res => {
        console.log("res", res.data)
        setClientSecret(res.data.data.clientSecret)
        dispatch(unsetLoading())
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/401')
        } else {
          setCheckout(false)
          console.log(error.response.data);
          console.log(error.response.status);
          enqueueSnackbar('Unable to fetch data.', { variant: 'error' })
        }
        dispatch(unsetLoading())
      })
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripe}>
          <CheckoutForm url={`${window.location.origin}${location.pathname}`} />
        </Elements>
      )}
    </div>
  );
}