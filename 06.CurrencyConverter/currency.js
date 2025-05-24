const axios = require("axios");


const API_URL = "https://open.er-api.com/v6/latest/USD"

const getCurrencyRates = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data.rates;
    } catch (error) {
        console.error("Error fetching currency rates!");
    }
}

module.exports = {getCurrencyRates};