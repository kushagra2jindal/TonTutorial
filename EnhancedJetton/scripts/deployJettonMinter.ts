import { Address, toNano } from 'ton-core';
import { JettonMinter, JettonMinterContent, jettonContentToCell, jettonMinterConfigToCell } from '../wrappers/JettonMinter';
import { compile, NetworkProvider, UIProvider } from '@ton-community/blueprint';
// import { promptAddress, promptBool, promptUrl } from '../wrappers/ui-utils';

const formatUrl = "https://github.com/ton-blockchain/TEPs/blob/master/text/0064-token-data-standard.md#jetton-metadata-example-offchain";
const exampleContent = {
    "name": "Test!!!",
    "description": "Sample of Jetton",
    "symbol": "TEST",
    "decimals": 9,
    "image": "https://www.svgrepo.com/download/483336/coin-vector.svg"
};
// const urlPrompt = 'Please specify url pointing to jetton metadata(json):';

export async function run(provider: NetworkProvider) {
    const ui = provider.ui();
    ui.write(`Jetton deployer\nCurrent deployer only supports off-chain format:${formatUrl}`);

    const content = jettonContentToCell({ type: 1, uri: "https://integraate.com/" });

    const wallet_code = await compile('JettonWallet');

    const minter = JettonMinter.createFromConfig({
        admin: provider.sender().address as Address,
        content,
        wallet_code,
    },
        await compile('JettonMinter'));

    await provider.deploy(minter, toNano('0.05'));
}