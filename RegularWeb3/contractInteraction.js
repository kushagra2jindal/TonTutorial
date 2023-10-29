const { TonClient } = require('@ton/ton');
const { Address } = require('@ton/core');

const readQuery = async() => {
    const client = new TonClient({
        endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
    });
    const result = await client.runMethod(
        Address.parse('kQAWnQlwPfYOdvCr2eNP2DJUY4Q6WVSLRRSOrNCua9tTJDg-'),
        'get_jetton_data'
    );
    console.log(result.stack.items);
};

readQuery();