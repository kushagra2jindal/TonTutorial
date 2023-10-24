import { toNano } from 'ton-core';
import { InternalMessage } from '../wrappers/InternalMessage';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const internalMessage = provider.open(InternalMessage.createFromConfig({}, await compile('InternalMessage')));

    await internalMessage.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(internalMessage.address);

    // run methods on `internalMessage`
}
