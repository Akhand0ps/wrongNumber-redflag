import axios from "axios"

const BASE = "https://wrongnumber-backend.onrender.com/api/v1"

export const analyzeMessage = (message) =>
  axios.post(`${BASE}/analyze`, { message })

export const checkUpi = (upi_id) =>
  axios.post(`${BASE}/upi_checker`, { upi_id })

export const checkLoanApp = (appname) =>
  axios.post(`${BASE}/loan-app-checker`, { appname })
