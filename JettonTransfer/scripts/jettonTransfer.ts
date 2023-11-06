import { Address, toNano } from 'ton-core';
import { JettonTransfer } from '../wrappers/JettonTransfer';
import { NetworkProvider, sleep } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Counter address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const jettonTransfer = provider.open(JettonTransfer.createFromAddress(address));

    await jettonTransfer.sendTransfer(provider.sender(), {
        walletTokenAddress: Address.parse("kQAdfNziLCZ_nBQGa0PYXoAU6yE2zu2v2LvDr-1nVHy-FnOI"),
        value: toNano('0.5'),
    });

    ui.write('Txn successfully!');
}
