import { toNano } from 'ton-core';
import { InternalMessageBody } from '../wrappers/InternalMessageBody';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const internalMessageBody = provider.open(InternalMessageBody.createFromConfig({}, await compile('InternalMessageBody')));

    await internalMessageBody.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(internalMessageBody.address);

    // run methods on `internalMessageBody`
}
