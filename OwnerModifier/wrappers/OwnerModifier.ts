import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type OwnerModifierConfig = {
    ownerAddress: Address
};

export function ownerModifierConfigToCell(config: OwnerModifierConfig): Cell {
    return beginCell()
        .storeAddress(config.ownerAddress)
        .endCell();
}

export class OwnerModifier implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new OwnerModifier(address);
    }

    static createFromConfig(config: OwnerModifierConfig, code: Cell, workchain = 0) {
        const data = ownerModifierConfigToCell(config);
        const init = { code, data };
        return new OwnerModifier(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendTransfer(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value: value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0x95db9d39, 32)
                .endCell(),
        });
    }

    async sendWithdraw(provider: ContractProvider, via: Sender, value: bigint, amount: bigint) {
        await provider.internal(via, {
            value: value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0xb5de5f9e, 32)
                .storeCoins(amount)
                .endCell(),
        });
    }
}
