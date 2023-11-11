import { Address, toNano } from 'ton-core';
import { OwnerModifier } from '../wrappers/OwnerModifier';
import { NetworkProvider, sleep } from '@ton-community/blueprint';
import { randomAddress } from '@ton-community/test-utils';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Owner Modifier Address'));

    const ownerModifier = provider.open(OwnerModifier.createFromAddress(address));

        await ownerModifier.sendTransfer(provider.sender(), toNano('4'));

    ui.write('Transfered successfully!');
}
