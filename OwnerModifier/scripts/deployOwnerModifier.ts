import { Address, toNano } from 'ton-core';
import { OwnerModifier } from '../wrappers/OwnerModifier';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const ownerModifier = provider.open(OwnerModifier.createFromConfig({
        ownerAddress: provider.sender().address as Address
    }, await compile('OwnerModifier')));

    await ownerModifier.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(ownerModifier.address);

    // run methods on `ownerModifier`
}
