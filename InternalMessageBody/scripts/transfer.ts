import { Address, toNano } from 'ton-core';
import { InternalMessageBody } from '../wrappers/InternalMessageBody';
import { NetworkProvider, sleep } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Internal Message address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const internalMessage = provider.open(InternalMessageBody.createFromAddress(address));

    await internalMessage.sendTransfer(provider.sender(), {
        value: toNano('0.003'),
    });

    ui.write('Waiting for transaction to happen... check the tonViewer');
}
