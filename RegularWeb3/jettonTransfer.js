const { Address, beginCell, internal, storeMessageRelaxed, toNano } = require("@ton/core");
const { TonClient, WalletContractV4, JettonMaster } = require("@ton/ton");
const { mnemonicNew, mnemonicToPrivateKey, mnemonicToWalletKey } = require("@ton/crypto");
const { getHttpEndpoint } = require("@orbs-network/ton-access");

require('dotenv').config();

// const client = new TonClient({
//     endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC'
// });

const wait = async() => {
    console.log("Start waiting...");
    await new Promise(resolve => setTimeout(resolve, 10000)); // 10000 milliseconds = 10 seconds
    console.log("Done waiting!");
  }

const getRandomAddress = async () => {
    let mnemonics = await mnemonicNew();
    let keyPair = await mnemonicToPrivateKey(mnemonics);
    console.log(keyPair.secretKey.toString('hex'))
    let wallet = WalletContractV4.create({ workchain: 0, publicKey: keyPair.publicKey });
    console.log(wallet);
}

console.log

const getUserJettonAddress = async () => {
    const jettonMasterAddress = Address.parse('kQB3MtovD4b6Yy_4u5L26VGdLs3RSDq-wPxh68T_tSkMlj0V');
    const userAddress = Address.parse('EQD6SIfTQFGd23GOuzIS0GbmzC_e5QYzRbJ7k1y8EEN8Wiba');

    const jettonMaster = client.open(JettonMaster.create(jettonMasterAddress));
    return (await jettonMaster.getWalletAddress(userAddress));
};

async function main() {
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });
    // const jettonWalletAddress = await getUserJettonAddress();
    const jettonWalletAddress = Address.parse('kQCdqPDqv5VGbcVFRyAEx_oXu93pNLnPTTpNUsGVCqqFJB5D');//YAHA USER TOKEN WALLET ADDRESS AAEGA
    const destinationAddress = Address.parse('0QBJe5Mhq11CD7EUazsgRY86RRfM4xS20okKQW1OkwP3doiY');//YAHA DESTINATION WALLET ADDRESS AAEGA

    const forwardPayload = beginCell()
        .storeUint(0, 32)
        .storeStringTail('Hello, FO!!')
        .endCell();

    const messageBody = beginCell()
        .storeUint(0x0f8a7ea5, 32) // opcode for jetton transfer
        .storeUint(0, 64) // query id
        .storeCoins(toNano(5)) // jetton amount, amount * 10^9
        .storeAddress(destinationAddress)
        .storeAddress(destinationAddress) // response destination
        .storeBit(0) // no custom payload
        .storeCoins(0) // forward amount
        .storeBit(1) // we store forwardPayload as a reference
        .storeRef(forwardPayload)
        .endCell();

    const internalMessage = internal({
        to: jettonWalletAddress,
        value: toNano('0.1'),
        bounce: true,
        body: messageBody
    });

    // const internalMessageCell = beginCell()
    //     .store(storeMessageRelaxed(internalMessage))
    //     .endCell();
    //     await wait();

    const mnemonic = process.env.MNEMONIC_KEY;
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({
        publicKey: key.publicKey,
        workchain: 0,
    });

    // if (!(await client.isContractDeployed(wallet.address))) {
    //     return console.log("wallet is not deployed");
    // }

    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();
    // const seqno = 57;

    const txn = await walletContract.sendTransfer({
        secretKey: key.secretKey,
        seqno: seqno,
        messages: [
            internalMessage
        ],
    });

    console.log(txn);
}

main();