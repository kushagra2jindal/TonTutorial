import { Address, toNano } from 'ton-core';
import { Wton } from '../wrappers/Wton';
import { NetworkProvider, sleep } from '@ton-community/blueprint';
import { randomAddress } from '@ton-community/test-utils';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('WTON Address'));

    const wTon = provider.open(Wton.createFromAddress(address));

        await wTon.sendDeposit(provider.sender(), {
            value: toNano('1.2'),
            queryId: Date.now()
        });

    ui.write('Transfered successfully!');
}

