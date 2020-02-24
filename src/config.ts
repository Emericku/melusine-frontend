export default {
    backendUrl: process.env.REACT_APP_BACKEND_URL,
    appName: process.env.REACT_APP_APP_NAME,
    pollingFrequency: Number(process.env.REACT_APP_POLLING_FREQUENNCY) || 60,
    toastDuration: Number(process.env.REACT_APP_TOAST_DURATION) || 3
}
