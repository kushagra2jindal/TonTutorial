// import { toNano } from 'ton-core';
// import { Testing } from '../wrappers/Testing';
// import { compile, NetworkProvider } from '@ton-community/blueprint';
 
// export async function run(provider: NetworkProvider) {
//     const testing = provider.open(Testing.createFromConfig({
//         abc: 1
//     }, await compile('Testing')));

//     await testing.sendDeploy(provider.sender(), toNano('0.05'));

//     await provider.waitForDeploy(testing.address);

//     // run methods on `testing`
// }

import { toNano } from 'ton-core';
import { Testing } from '../wrappers/Testing';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    
    const testing = provider.open(
        Testing.createFromConfig(
            {
                id: 1,
                abc: 10
            },
            await compile('Testing')
        )
    );
    await testing.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(testing.address);

}

