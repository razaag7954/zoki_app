import axios from 'axios'

// export const SERVER_URI = "https://27bb-182-186-209-190.ngrok.io"
// export const SERVER_URI = "https://www.staging.api.flywithzoki.com"
export const SERVER_URI = "https://d41a-39-46-91-46.ngrok.io"

// Public
export const GET_ALL_FLIGHT_OFFERS = "/air/flight-offers"
export const GET_ALL_HOTEL_OFFERS = "/public/hotels"
export const GET_ALL_CAR_OFFERS = "/public/hotels"
export const GET_ALL_PACKAGE_OFFERS = "/public/travel-packages"
export const GET_ALL_AIRPOTS = "/public/airports"

// Common
export const GET_ALLOWED_CURRENCIES = "/fetch/currencies"
export const GET_ALLOWED_LANGUAGES = "/fetch/languages"
export const GET_ALLOWED_SUBSCRIPTION_PLAN = "/fetch/subscription-plans"
export const GET_ALLOWED_AIRPORTS = "/fetch/airports"
export const GET_ALLOWED_AGENCIES = "/fetch/agencies"

// Auth API's
export const SIGNUP_CUSTOMER = "/customers/signup"
export const SIGNUP_AGENCY = "/agencies/signup"
export const LOGIN_CUSTOMER = "/auth/customer/login"
export const LOGIN_AGENCY = "/auth/login"
export const DECODE_TOKEN_CUSTOMER = "/auth/customer/me"
export const DECODE_TOKEN_AGENCY = "/auth/me"
export const LOGOUT_CUSTOMER = "/auth/customer/logout"
export const LOGOUT_AGENCY = "/auth/logout"

// Booking
export const BOOK_FLIGHT = "/bookings/air"
export const BOOK_HOTEL = "/bookings/hotel"
export const BOOK_CAR = "/bookings/air"
export const BOOK_PACKAGE = "/bookings/travel-package"
export const FETCH_ALL_BOOKING = "/bookings"
export const FETCH_SPECIFIC_BOOKING = "/bookings/"
export const UPDATE_SPECIFIC_BOOKING = "/bookings/"
export const DELETE_SPECIFIC_BOOKING = "/bookings/"

// Hotel API's
export const ADD_NEW_HOTEL = "/hotels"
export const FETCH_ALL_HOTEL = "/hotels"
export const FETCH_SPECIFIC_HOTEL = "/hotels/"
export const UPDATE_SPECIFIC_HOTEL = "/hotels/"
export const DELETE_SPECIFIC_HOTEL = "/hotels/"

// Package API's
export const ADD_NEW_PACKAGE = "/travel-packages"
export const FETCH_ALL_PACKAGE = "/travel-packages"
export const FETCH_SPECIFIC_PACKAGE = "/travel-packages/"
export const UPDATE_SPECIFIC_PACKAGE = "/travel-packages/"
export const DELETE_SPECIFIC_PACKAGE = "/travel-packages/"

// Agency User (Owner Admin Agent) API's
export const ADD_NEW_USER = "/users"
export const FETCH_ALL_USER = "/users"
export const FETCH_SPECIFIC_USER = "/users/"
export const UPDATE_SPECIFIC_USER = "/users/"
export const DELETE_SPECIFIC_USER = "/users/"

// Agency API's
export const FETCH_ALL_AGENCY = "/agencies"
export const FETCH_SPECIFIC_AGENCY = "/agencies/"
export const UPDATE_SPECIFIC_AGENCY = "/agencies/"
export const DELETE_SPECIFIC_AGENCY = "/agencies/"

// Customers API's
export const FETCH_ALL_CUSTOMER = "/customers"
export const FETCH_SPECIFIC_CUSTOMER = "/customers/"
export const UPDATE_SPECIFIC_CUSTOMER = "/customers/"

// Voucher API's
export const ADD_NEW_VOUCHER = "/vouchers"
export const FETCH_ALL_VOUCHER = "/vouchers"
export const FETCH_SPECIFIC_VOUCHER = "/vouchers/"
export const UPDATE_SPECIFIC_VOUCHER = "/vouchers/"
export const DELETE_SPECIFIC_VOUCHER = "/vouchers/"

// Payments
export const GET_CLIENT_SECRET = '/topups/methods/stripe'
export const GET_ALL_TOPUP_REQUESTS = "/topup-requests"
export const FETCH_SPECIFIC_TOPUP_REQUEST = "/topup-requests/"
export const ACCEPT_SPECIFIC_TOPUP_REQUEST = "/topup-requests/"
export const REJECT_SPECIFIC_TOPUP_REQUEST = "/topup-requests/"
export const FETCH_SPECIFIC_WALLET = "/wallets/"
export const GET_PAYMENT_HISTORY_BY_ID = "/wallets/"
export const REQUEST_TOPUP = "/wallets/"

// Public Requests
export const getAvailableFlights = (params) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + GET_ALL_FLIGHT_OFFERS, {
        headers: { Authorization: AuthStr },
        params
    })
}

export const getAvailableHotels = (params) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + GET_ALL_HOTEL_OFFERS, {
        headers: { Authorization: AuthStr },
        params
    })
}

export const getAvailableCars = (params) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + GET_ALL_CAR_OFFERS, {
        headers: { Authorization: AuthStr },
        params
    })
}

export const getAvailablePackages = (params) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + GET_ALL_PACKAGE_OFFERS, {
        headers: { Authorization: AuthStr },
        params
    })
}

export const getAllAirports = (params) => {
    return axios.get(SERVER_URI + GET_ALL_AIRPOTS, {
        params
    })
}

// Common Requests
export const getCurrencyList = () => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + GET_ALLOWED_CURRENCIES, {
        headers: { Authorization: AuthStr }
    })
}

export const getLanguageList = () => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + GET_ALLOWED_LANGUAGES, {
        headers: { Authorization: AuthStr }
    })
}

export const getSubPlanList = () => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + GET_ALLOWED_SUBSCRIPTION_PLAN, {
        headers: { Authorization: AuthStr }
    })
}

export const getAirportList = (params) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + GET_ALLOWED_AIRPORTS, {
        headers: { Authorization: AuthStr },
        params
    })
}

export const getAgencyList = (params) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + GET_ALLOWED_AGENCIES, {
        headers: { Authorization: AuthStr },
        params
    })
}

// Auth Requests
export const signUpCustomer = (payload) => {
    return axios.post(SERVER_URI + SIGNUP_CUSTOMER, payload)
}

export const signUpAgency = (payload) => {
    return axios.post(SERVER_URI + SIGNUP_AGENCY, payload)
}

export const loginCustomer = (payload) => {
    return axios.post(SERVER_URI + LOGIN_CUSTOMER, payload)
}

export const loginAgency = (payload) => {
    return axios.post(SERVER_URI + LOGIN_AGENCY, payload)
}

export const decodeTokenCustomer = (token) => {
    localStorage.setItem('token', token)
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + DECODE_TOKEN_CUSTOMER, {
        headers: { Authorization: AuthStr }
    })
}

export const decodeTokenAgency = (token) => {
    localStorage.setItem('token', token)
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + DECODE_TOKEN_AGENCY, {
        headers: { Authorization: AuthStr }
    })
}

export const logoutCustomer = () => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + LOGOUT_CUSTOMER, {
        headers: { Authorization: AuthStr }
    })
}

export const logoutAgency = () => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + LOGOUT_AGENCY, {
        headers: { Authorization: AuthStr }
    })
}

// Booking Requests
export const bookFlight = (payload) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.post(SERVER_URI + BOOK_FLIGHT, payload, {
        headers: { Authorization: AuthStr }
    })
}

export const bookHotel = (payload) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.post(SERVER_URI + BOOK_HOTEL, payload, {
        headers: { Authorization: AuthStr }
    })
}

export const bookCar = (payload) => {
    return axios.post(SERVER_URI + BOOK_CAR, payload)
}

export const bookPackage = (payload) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.post(SERVER_URI + BOOK_PACKAGE, payload, {
        headers: { Authorization: AuthStr }
    })
}

export const getAllBookings = (params) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + FETCH_ALL_BOOKING, {
        headers: { Authorization: AuthStr },
        params
    })
}

export const getSpecificBooking = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + FETCH_SPECIFIC_BOOKING + id, {
        headers: { Authorization: AuthStr }
    })
}

export const updateSpecificBooking = (id, payload) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.patch(SERVER_URI + UPDATE_SPECIFIC_BOOKING + id, payload, {
        headers: { Authorization: AuthStr }
    })
}

export const deleteBooking = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.delete(SERVER_URI + DELETE_SPECIFIC_BOOKING + id, {
        headers: { Authorization: AuthStr }
    })
}

// Hotel Requests
export const getAllHotels = (params) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + FETCH_ALL_HOTEL, {
        headers: { Authorization: AuthStr },
        params
    })
}

export const addNewHotel = (payload) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.post(SERVER_URI + ADD_NEW_HOTEL, payload, {
        headers: { Authorization: AuthStr }
    })
}

export const getSpecificHotel = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + FETCH_SPECIFIC_HOTEL + id, {
        headers: { Authorization: AuthStr }
    })
}

export const updateSpecificHotel = (id, payload) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.patch(SERVER_URI + UPDATE_SPECIFIC_HOTEL + id, payload, {
        headers: { Authorization: AuthStr }
    })
}

export const deleteHotel = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.delete(SERVER_URI + DELETE_SPECIFIC_HOTEL + id, {
        headers: { Authorization: AuthStr }
    })
}

// Travel Package Requests
export const getAllPackages = (params) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + FETCH_ALL_PACKAGE, {
        headers: { Authorization: AuthStr },
        params
    })
}

export const addNewPackage = (payload) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.post(SERVER_URI + ADD_NEW_PACKAGE, payload, {
        headers: { Authorization: AuthStr }
    })
}

export const getSpecificPackage = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + FETCH_SPECIFIC_PACKAGE + id, {
        headers: { Authorization: AuthStr }
    })
}

export const updateSpecificPackage = (id, payload) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.patch(SERVER_URI + UPDATE_SPECIFIC_PACKAGE + id, payload, {
        headers: { Authorization: AuthStr }
    })
}

export const deletePackage = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.delete(SERVER_URI + DELETE_SPECIFIC_PACKAGE + id, {
        headers: { Authorization: AuthStr }
    })
}

// Agency User (Agents, Owner, Admin) Requests
export const getAllUsers = (params) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + FETCH_ALL_USER, {
        headers: { Authorization: AuthStr },
        params
    })
}

export const addNewUser = (payload) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.post(SERVER_URI + ADD_NEW_USER, payload, {
        headers: { Authorization: AuthStr }
    })
}

export const getSpecificUser = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + FETCH_SPECIFIC_USER + id, {
        headers: { Authorization: AuthStr }
    })
}

export const updateSpecificUser = (id, payload) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.patch(SERVER_URI + UPDATE_SPECIFIC_USER + id, payload, {
        headers: { Authorization: AuthStr }
    })
}

export const deleteUser = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.delete(SERVER_URI + DELETE_SPECIFIC_USER + id, {
        headers: { Authorization: AuthStr }
    })
}

// Agency Requests
export const getAllAgencies = (params) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + FETCH_ALL_AGENCY, {
        headers: { Authorization: AuthStr },
        params
    })
}

export const getSpecificAgency = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + FETCH_SPECIFIC_AGENCY + id, {
        headers: { Authorization: AuthStr }
    })
}

export const updateSpecificAgency = (id, payload) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.patch(SERVER_URI + UPDATE_SPECIFIC_AGENCY + id, payload, {
        headers: { Authorization: AuthStr }
    })
}

export const deleteAgency = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.delete(SERVER_URI + DELETE_SPECIFIC_AGENCY + id, {
        headers: { Authorization: AuthStr }
    })
}

// Customers Requests
export const getAllCustomers = (params) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + FETCH_ALL_CUSTOMER, {
        headers: { Authorization: AuthStr },
        params
    })
}

export const getSpecificCustomer = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + FETCH_SPECIFIC_CUSTOMER + id, {
        headers: { Authorization: AuthStr }
    })
}

export const updateSpecificCustomer = (id, payload) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.patch(SERVER_URI + UPDATE_SPECIFIC_CUSTOMER + id, payload, {
        headers: { Authorization: AuthStr }
    })
}

// Vouchers Requests
export const getAllVouchers = (params) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + FETCH_ALL_VOUCHER, {
        headers: { Authorization: AuthStr },
        params
    })
}

export const addNewVoucher = (payload) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.post(SERVER_URI + ADD_NEW_VOUCHER, payload, {
        headers: { Authorization: AuthStr }
    })
}

export const getSpecificVoucher = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + FETCH_SPECIFIC_VOUCHER + id, {
        headers: { Authorization: AuthStr }
    })
}

export const updateSpecificVoucher = (id, payload) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.patch(SERVER_URI + UPDATE_SPECIFIC_VOUCHER + id, payload, {
        headers: { Authorization: AuthStr }
    })
}

export const deleteVoucher = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.delete(SERVER_URI + DELETE_SPECIFIC_VOUCHER + id, {
        headers: { Authorization: AuthStr }
    })
}

// Payments 
export const getClientSecret = (payload) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.post(SERVER_URI + GET_CLIENT_SECRET, payload, {
        headers: { Authorization: AuthStr }
    })
}

export const getAllTopupRequest = (params) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + GET_ALL_TOPUP_REQUESTS, {
        headers: { Authorization: AuthStr },
        params
    })
}

export const getSpecificTopupRequest = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + FETCH_SPECIFIC_TOPUP_REQUEST + id, {
        headers: { Authorization: AuthStr }
    })
}

export const approveSpecificTopupRequest = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.patch(SERVER_URI + ACCEPT_SPECIFIC_TOPUP_REQUEST + id + "/approve", {}, {
        headers: { Authorization: AuthStr }
    })
}

export const rejectSpecificTopupRequest = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.patch(SERVER_URI + REJECT_SPECIFIC_TOPUP_REQUEST + id + "/decline", {}, {
        headers: { Authorization: AuthStr }
    })
}

export const getSpecificWallet = (id) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + FETCH_SPECIFIC_WALLET + id, {
        headers: { Authorization: AuthStr }
    })
}

export const getPaymentHistoryById = (id, params) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.get(SERVER_URI + GET_PAYMENT_HISTORY_BY_ID + id + "/transactions", {
        headers: { Authorization: AuthStr },
        params
    })
}

export const requestTopup = (id, payload) => {
    const token = localStorage.getItem('token')
    const AuthStr = 'Bearer '.concat(token);
    return axios.post(SERVER_URI + REQUEST_TOPUP + id + "/request-topup", payload, {
        headers: { Authorization: AuthStr }
    })
}