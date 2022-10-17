import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "redux/actions";
import { getSpecificHotel, getAgencyList, deleteHotel, updateSpecificHotel } from 'crud'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
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
  imgGallery: {
    border: "1px solid black",
    width: 85,
    height: 85,
    '&:hover': {
      cursor: 'pointer',
      border: '1px solid red',
      opacity: 0.3
    }
  },
  imgGalleryOverlay: {
    position: 'absolute',
    width: 85,
    height: 85,
    top: 0,
    left: 0,
    zIndex: 10,
    opacity: 0,
    backgroundColor: 'black',
    '&:hover': {
      opacity: 0.9
    }
  }
};

const useStyles = makeStyles(styles);

export default function EditHotel({ setReload, id, setRender }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  const [featuredImg, setFeaturedImg] = useState('');
  const [imgGallery, setImgGallery] = useState([]);
  const [rooms, setRooms] = useState('');
  const [price, setPrice] = useState('');
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
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState('');
  const [agencies, setAgencies] = useState([]);
  const [searchAgency, setSearchAgency] = useState('');
  const [loadingAgency, setLoadingAgency] = useState(false);
  const [agenciesList, setAgenciesList] = useState([]);
  const [tags, setTags] = useState([]);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    dispatch(setLoading())
    getSpecificHotel(id)
      .then(res => {
        console.log(res.data.data.hotel)
        loadValuesHandler(res.data.data.hotel)
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

  useEffect(() => {
    setLoadingAgency(true)
    const params = {
      search: searchAgency,
      page: 1,
      pageSize: 20
    }
    getAgencyList(params)
      .then(res => {
        console.log(res.data)
        setAgenciesList(res.data.data.agencies)
        setLoadingAgency(false)
      })
      .catch(error => {
        if (error.response.status === 401) {
          history.push('/401')
        } else {
          console.log(error.response.data);
          console.log(error.response.status);
          enqueueSnackbar('Unable to fetch agencies list.', { variant: 'error' })
          setLoadingAgency(false)
        }
      })
  }, [searchAgency])

  const loadValuesHandler = (hotel) => {
    setName(hotel.name ? hotel.name : "");
    setFeaturedImg(hotel.featuredImg ? hotel.featuredImg : "");
    setImgGallery([]);
    setRooms(hotel.noOfRooms ? hotel.noOfRooms : null);
    setPrice(hotel.price ? hotel.price : "");
    setPhone(hotel.contactInfo.phone ? hotel.contactInfo.phone : "");
    setExt(hotel.contactInfo.ext ? hotel.contactInfo.ext : "");
    setFax(hotel.contactInfo.fax ? hotel.contactInfo.fax : "");
    setMobile(hotel.contactInfo.mobile ? hotel.contactInfo.mobile : "");
    setEmail(hotel.contactInfo.email ? hotel.contactInfo.email : "");
    setUnitNo(hotel.address?.unitNo ? hotel.address.unitNo : "");
    setStreet(hotel.address?.street ? hotel.address.street : "");
    setCity(hotel.address?.city ? hotel.address.city : "");
    setZip(hotel.address?.zip ? hotel.address.zip : "");
    setState(hotel.address?.state ? hotel.address.state : "");
    setCountry(hotel.address?.country ? hotel.address.country : "");
    setStatus(hotel.status ? hotel.status : "");
    if (hotel._agencies.length) {
      let temp = []
      hotel._agencies.forEach((a) => temp.push(a.businessName))
      setAgencies(temp);
    } else {
      setAgencies([]);
    }
    setTags(hotel.tags ? hotel.tags : []);
    setFacilities(hotel.facilities ? hotel.facilities : []);
    // setLat(hotel.address.lat);
    // setLong(hotel.address.street);
  }

  const updateHotelHandler = (e) => {
    e.preventDefault()
    if (!zip || zip.length < 5) {
      enqueueSnackbar('Zip Code must be at least 5 character long', { variant: 'info' })
      return
    }
    if (parseInt(ext) > 999) {
      enqueueSnackbar('Ext must be less than or equal to 999', { variant: 'info' })
      return
    }
    if (!featuredImg) {
      enqueueSnackbar('Please upload featured image.', { variant: 'info' })
      return
    }
    const payload = {
      name,
      featuredImg,
      contactInfo: {
        mobile,
        email
      },
      address: {
        unitNo,
        street,
        city,
        zip,
        state,
        country,
        // coordinates: {
        //   lat,
        //   long
        // }
      },
      noOfRooms: parseInt(rooms),
      price: parseFloat(price),
      tags,
      status
    }
    if (agencies.length) {
      let temp = []
      agencies.forEach((a) => {
        let doc = agenciesList.find((x) => x.label === a)
        temp.push(doc.value)
      })
      console.log(temp)
      payload['_agencies'] = temp
    }
    if (facilities.length)
      payload['facilities'] = facilities
    if (phone)
      payload.contactInfo['phone'] = phone
    if (ext)
      payload.contactInfo['ext'] = parseInt(ext)
    if (fax)
      payload.contactInfo['fax'] = fax
    dispatch(setLoading())
    console.log(payload)
    updateSpecificHotel(id, payload)
      .then(res => {
        // console.log(res.data)
        enqueueSnackbar('Hotel updated successfully.', { variant: 'success' })
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
          enqueueSnackbar('Unable to update hotel.', { variant: 'error' })
        }
        dispatch(unsetLoading())
      })
  }

  const deleteHandler = () => {
    dispatch(setLoading())
    deleteHotel(id)
      .then(res => {
        // console.log(res.data)
        enqueueSnackbar('Hotel delete successfully.', { variant: 'success' })
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
          enqueueSnackbar('Unable to delete hotel.', { variant: 'error' })
        }
        dispatch(unsetLoading())
      })
  }

  const handleFeaturedImageChange = (index) => {
    setFeaturedImg(imgGallery[index])
    enqueueSnackbar('Featured Image Changed.', { variant: 'info' })
  };

  const handleImageDelete = (index) => {
    let temp = [...imgGallery]
    temp.splice(index, 1)
    setImgGallery(temp)
    enqueueSnackbar('Image Delete Success.', { variant: 'info' })
  };

  return (
    <div>
      <form onSubmit={updateHotelHandler}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={7}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>Edit Hotel</h4>
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
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="No. of Rooms"
                      value={rooms}
                      onChange={(e) => setRooms(e.target.value)}
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
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className='mt-4 w-100'
                      label="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
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
                <div className="w-100 d-flex justify-content-center flex-wrap my-1">
                  {
                    imgGallery.map((im, i) => {
                      return <React.Fragment key={i}>
                        <div className="position-relative">
                          <img
                            src={im}
                            className={`mr-2 mb-2 ${classes.imgGallery}`}
                            alt="..."
                          />
                          <div className={classes.imgGalleryOverlay}>
                            <div className="d-flex w-100 h-100 justify-content-center align-items-center" style={{ opacity: 1 }}>
                              <IconButton onClick={() => handleFeaturedImageChange(i)} size='small'>
                                <StarIcon color='primary' />
                              </IconButton>
                              <IconButton onClick={() => handleImageDelete(i)} size='small'>
                                <DeleteIcon color='error' />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    })
                  }
                </div>
                <DropZone setImgGallery={setImgGallery} />
                <Autocomplete
                  multiple
                  value={agencies}
                  onChange={(e, value) => setAgencies(value)}
                  className="w-100 mt-4"
                  id="agencies"
                  loading={loadingAgency}
                  options={agenciesList.map((a, i) => a.label)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      onChange={(e) => setSearchAgency(e.target.value)}
                      label="Agencies"
                      required={agencies.length === 0}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loadingAgency ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
                <Autocomplete
                  multiple
                  value={facilities}
                  onChange={(e, value) => setFacilities(value)}
                  className="w-100 mt-4"
                  id="facilities"
                  freeSolo
                  options={[]}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip color="primary" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Facilities"
                      required={facilities.length === 0}
                    />
                  )}
                />
                <Autocomplete
                  multiple
                  value={tags}
                  onChange={(e, value) => setTags(value)}
                  className="w-100 my-4"
                  id="tags"
                  required
                  freeSolo
                  options={[]}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip color="secondary" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Tags"
                      required={tags.length === 0}
                    />
                  )}
                />
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
    </div>
  );
}
