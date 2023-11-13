import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type WtonConfig = {
    adminAddress: Address,
    content: Cell,
    jettonWalletCode: Cell
};

export function wtonConfigToCell(config: WtonConfig): Cell {
    return beginCell()
        .storeCoins(10000000000)
        .storeAddress(config.adminAddress)
        .storeRef(config.content)
        .storeRef(config.jettonWalletCode)
    .endCell();
}

export class Wton implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) { }

    static createFromAddress(address: Address) {
        return new Wton(address);
    }

    static createFromConfig(config: WtonConfig, code: Cell, workchain = 0) {
        const data = wtonConfigToCell(config);
        const init = { code, data };
        return new Wton(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendDeposit(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .endCell(),
        });
    }
}
