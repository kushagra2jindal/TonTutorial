import { Address, toNano } from 'ton-core';
import { JettonMinter, JettonMinterContent, jettonContentToCell, jettonMinterConfigToCell } from '../wrappers/JettonMinter';
import { compile, NetworkProvider, UIProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Minter address'));
    const jettonMinter = provider.open(JettonMinter.createFromAddress(address));

    await jettonMinter.sendMint(
        provider.sender(), 
        provider.sender().address as Address, 
        toNano('21000000'), 
        toNano('1'), 
        toNano('1')
    );

    ui.write('Minted successfully!');
}