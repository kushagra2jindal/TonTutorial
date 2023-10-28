const { Address, TonClient, WalletContractV4, internal } = require("ton");
const { getHttpEndpoint } = require("@orbs-network/ton-access");
const { mnemonicToWalletKey } = require("@ton/crypto");


require('dotenv').config();

const receiver = "UQDkdgH3lxABIO29Dv_VZY1lH_4IcogWIcJvYprFCAAK8H-g"; //tama's public address!!


async function main() {
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });
    const mnemonic = process.env.MNEMONIC_KEY;
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({
        publicKey: key.publicKey,
        workchain: 0,
    });

    if (!(await client.isContractDeployed(wallet.address))) {
        return console.log("wallet is not deployed");
    }

      const walletContract = client.open(wallet);
      const seqno = await walletContract.getSeqno();
      const txn = await walletContract.sendTransfer({
        secretKey: key.secretKey,
        seqno: seqno,
        messages: [
          internal({
            to: receiver,
            value: "0.0005",
            body: "nodejs transfer!! 1234567890",
            bounce: false,
          }),
        ],
      });
}

main();