const { TonClient } = require('@ton/ton');
const { Address } = require('@ton/core');
const axios = require('axios');

const init = async () => {

    const client = new TonClient({
        endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
    });
    const walletAddress = Address.parse("EQD6SIfTQFGd23GOuzIS0GbmzC_e5QYzRbJ7k1y8EEN8Wiba");

    // // GET BALANCE FOR THE GIVEN WALLET!!
    // const balance = await client.getBalance(walletAddress);
    // console.log(parseInt(balance) / 10 ** 9);

    // GET TRANSACTIONS OF THE GIVEN WALLET!!
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://testnet.toncenter.com/api/v2/getTransactions?address=EQD6SIfTQFGd23GOuzIS0GbmzC_e5QYzRbJ7k1y8EEN8Wiba&limit=1&to_lt=0&archival=false',
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