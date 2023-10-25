import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type InternalMessageBodyConfig = {};

export const Opcodes = {
    transfer: 0x3ee943f1,
};

export function internalMessageBodyConfigToCell(config: InternalMessageBodyConfig): Cell {
    return beginCell().endCell();
}

export class InternalMessageBody implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new InternalMessageBody(address);
    }

    static createFromConfig(config: InternalMessageBodyConfig, code: Cell, workchain = 0) {
        const data = internalMessageBodyConfigToCell(config);
        const init = { code, data };
        return new InternalMessageBody(contractAddress(workchain, init), init);
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
