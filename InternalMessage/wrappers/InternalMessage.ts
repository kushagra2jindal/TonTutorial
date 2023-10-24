import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type InternalMessageConfig = {};

export function internalMessageConfigToCell(config: InternalMessageConfig): Cell {
    return beginCell().endCell();
}

export const Opcodes = {
    transfer: 0x3ee943f1,
};


export class InternalMessage implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new InternalMessage(address);
    }

    static createFromConfig(config: InternalMessageConfig, code: Cell, workchain = 0) {
        const data = internalMessageConfigToCell(config);
        const init = { code, data };
        return new InternalMessage(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendTransfer(
        provider: ContractProvider,
        via: Sender,
        opts: {
            value: bigint;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.transfer, 32)
                .endCell(),
        });
    }
}
