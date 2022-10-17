import React, { useState, useEffect } from "react";
import Moment from 'moment'
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "redux/actions";
import { getSpecificTopupRequest, approveSpecificTopupRequest, rejectSpecificTopupRequest } from 'crud'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
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

export default function EditRequest({ setReload, id, setRender }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [requestee, setRequestee] = useState('');
  const [description, setDescription] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [status, setStatus] = useState('');
  const [amount, setAmount] = useState('');
  const [requestId, setRequestId] = useState('');

  useEffect(() => {
    dispatch(setLoading())
    getSpecificTopupRequest(id)
      .then(res => {
        // console.log(res.data.data.topupRequest)
        loadValuesHandler(res.data.data.topupRequest)
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

  const loadValuesHandler = (request) => {
    setRequestee(request._requestee ? `${request._requestee.firstName} ${request._requestee.lastName}` : "");
    setDescription(request.description ? request.description : "");
    setCreatedAt(request.createdAt ? Moment(request.createdAt).format("YYYY-MM-DD") : "");
    setAmount(request.amount ? request.amount : "");
    setRequestId(request._topupRequestId ? request._topupRequestId : "");
    setStatus(request.status ? request.status : "");
  }

  const acceptRequestHandler = () => {
    dispatch(setLoading())
    approveSpecificTopupRequest(id)
      .then(res => {
        // console.log(res.data)
        enqueueSnackbar('Topup Request Approved.', { variant: 'success' })
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
          enqueueSnackbar(error.response.data?.error?.error, { variant: 'error' })
        }
        dispatch(unsetLoading())
      })
  }

  const rejectRequestHandler = () => {
    dispatch(setLoading())
    rejectSpecificTopupRequest(id)
      .then(res => {
        // console.log(res.data)
        enqueueSnackbar('Topup Request Rejected.', { variant: 'success' })
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
          enqueueSnackbar('Unable to reject this request.', { variant: 'error' })
        }
        dispatch(unsetLoading())
      })
  }

  return (
    <div>
      <form>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>View Topup Request</h4>
                <p className={classes.cardCategoryWhite}>Fly with Zoki!</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      className='mt-4 w-100'
                      label="Agent Name"
                      value={requestee}
                      required
                      disabled
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      className='mt-4 w-100'
                      label="Description"
                      value={description}
                      required
                      disabled
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      className='mt-4 w-100'
                      label="Request ID"
                      value={requestId}
                      required
                      disabled
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      className='mt-4 w-100'
                      label="Amount"
                      value={amount}
                      required
                      disabled
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      className='mt-4 w-100'
                      label="Timestamp"
                      type='date'
                      value={createdAt}
                      // onChange={(e) => setEffectiveDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      disabled
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      className='mt-4 w-100'
                      label="Status"
                      value={status}
                      required
                      disabled
                    />
                  </GridItem>
                </GridContainer>
                <div className="d-flex mt-4 w-100 justify-content-around">
                  <Button style={{ width: '32%' }} round onClick={() => setRender('all')}>
                    Go Back
                  </Button>
                  {status === 'PENDING' && <Button style={{ width: '32%' }} color="danger" round onClick={rejectRequestHandler}>
                    Reject
                  </Button>}
                  {(status === 'PENDING' || status === 'DECLINED') && <Button style={{ width: '32%' }} color="success" round onClick={acceptRequestHandler}>
                    Accept
                  </Button>}
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    </div >
  );
}