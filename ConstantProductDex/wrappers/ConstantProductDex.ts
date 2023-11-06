import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type ConstantProductDexConfig = {};

export function constantProductDexConfigToCell(config: ConstantProductDexConfig): Cell {
    return beginCell().endCell();
}

export class ConstantProductDex implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new ConstantProductDex(address);
    }

    static createFromConfig(config: ConstantProductDexConfig, code: Cell, workchain = 0) {
        const data = constantProductDexConfigToCell(config);
        const init = { code, data };
        return new ConstantProductDex(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
