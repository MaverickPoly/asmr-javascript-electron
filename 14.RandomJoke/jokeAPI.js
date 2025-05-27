const axios = require("axios");

const API_KEY = "API NINJAS API KEY";
const URL = "https://api.api-ninjas.com/v1/jokes";

const fetchRandomJoke = async () => {
    try {
        const response = await axios.get(URL, {
            headers: {
                "X-Api-Key": API_KEY
            }
        });
        return {success: true, joke: response.data[0].joke};
    } catch(e) {
        return {success: false};
    }
}


module.exports = {fetchRandomJoke}
