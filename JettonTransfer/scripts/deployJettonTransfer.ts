import { toNano } from 'ton-core';
import { JettonTransfer } from '../wrappers/JettonTransfer';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const jettonTransfer = provider.open(JettonTransfer.createFromConfig({}, await compile('JettonTransfer')));

    await jettonTransfer.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(jettonTransfer.address);

    // run methods on `jettonTransfer`
}
