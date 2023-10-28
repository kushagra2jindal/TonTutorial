import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type JettonTestConfig = {};

export function jettonTestConfigToCell(config: JettonTestConfig): Cell {
    return beginCell().endCell();
}

export class JettonTest implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new JettonTest(address);
    }

    static createFromConfig(config: JettonTestConfig, code: Cell, workchain = 0) {
        const data = jettonTestConfigToCell(config);
        const init = { code, data };
        return new JettonTest(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .endCell(),
        });
    }
}
