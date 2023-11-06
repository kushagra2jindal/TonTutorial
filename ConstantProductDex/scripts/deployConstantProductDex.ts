import { toNano } from 'ton-core';
import { ConstantProductDex } from '../wrappers/ConstantProductDex';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const constantProductDex = provider.open(ConstantProductDex.createFromConfig({}, await compile('ConstantProductDex')));

    await constantProductDex.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(constantProductDex.address);

    // run methods on `constantProductDex`
}
