import { toNano } from 'ton-core';
import { JettonTest } from '../wrappers/JettonTest';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const jettonTest = provider.open(JettonTest.createFromConfig({}, await compile('JettonTest')));

    await jettonTest.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(jettonTest.address);

    // run methods on `jettonTest`
}
