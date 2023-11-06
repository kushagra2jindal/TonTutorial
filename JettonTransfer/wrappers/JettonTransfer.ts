import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type JettonTransferConfig = {};

export const Opcodes = {
    transfer: 0x3ee943f1,
};

export function jettonTransferConfigToCell(config: JettonTransferConfig): Cell {
    return beginCell().endCell();
}

export class JettonTransfer implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new JettonTransfer(address);
    }

    static createFromConfig(config: JettonTransferConfig, code: Cell, workchain = 0) {
        const data = jettonTransferConfigToCell(config);
        const init = { code, data };
        return new JettonTransfer(contractAddress(workchain, init), init);
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
            walletTokenAddress: Address;
            value: bigint;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.transfer, 32)
                .storeAddress(opts.walletTokenAddress)
                .endCell(),
        });
    }

}
