import { Address, toNano } from 'ton-core';
import { Wton } from '../wrappers/Wton';
import { NetworkProvider, sleep } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Counter address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const wton = provider.open(Wton.createFromAddress(address));

    await wton.sendDeploy(provider.sender(), toNano('1'));

    ui.write('Txn successfully!');
}
