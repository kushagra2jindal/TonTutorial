const { TonClient } = require('@ton/ton');
const { Address } = require('@ton/core');
const axios = require('axios');

const init = async () => {

    // GET THE JETTON INFO USING API 
    const tokenAddress = "kQCk7uP11sxA76Mq9HGnGlTUMWA685BGGLQ_BLFsUzi1nUBj";
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://testnet.toncenter.com/api/v2/getTokenData?address=${tokenAddress}`,
        headers: {
            'accept': 'application/json'
        }
    };

    axios.request(config)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

};

init();