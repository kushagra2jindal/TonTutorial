import { Address, toNano } from 'ton-core';
import { Testing } from '../wrappers/Testing';
import { NetworkProvider, sleep } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Counter address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const testing = provider.open(Testing.createFromAddress(address));

    await testing.updateStorage(provider.sender(), {
        updatedAbc: 3837,
        value: toNano('0.05'),
    });

    
//     ui.write('storage updated successfully!');
}
