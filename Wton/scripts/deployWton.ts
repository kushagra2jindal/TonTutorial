import { Address, beginCell, toNano } from 'ton-core';
import { Wton } from '../wrappers/Wton';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const randomSeed = Math.floor(Math.random() * 10000);
    const wton = provider.open(Wton.createFromConfig({
        adminAddress: provider.sender().address as Address,
        content: beginCell().storeUint(randomSeed, 256).endCell(),
        jettonWalletCode: await compile('Wallet')
    }, await compile('Wton')));

    await wton.sendDeploy(provider.sender(), toNano('1'));

    await provider.waitForDeploy(wton.address);

    // run methods on `wton`
}
