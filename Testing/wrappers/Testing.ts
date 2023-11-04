import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type TestingConfig = {
    id: number;
    abc: number;
};
 
export function testingConfigToCell(config: TestingConfig): Cell {
    return beginCell().storeUint(config.id, 32).storeUint(config.abc, 32).endCell();
}

export const Opcodes = {
    update: 0x23cd52c,
};

export class Testing implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Testing(address);
    }

    static createFromConfig(config: TestingConfig, code: Cell, workchain = 0) {
        const data = testingConfigToCell(config);
        const init = { code, data };
        return new Testing(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendUpdateStorage(
        provider: ContractProvider,
        via: Sender,
        opts: {
            increaseBy: number;
            value: bigint;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.update, 32)
                .storeUint(opts.increaseBy, 32)
                .endCell(),
        });
    }

    async getAbc(provider: ContractProvider) {
        const result = await provider.get('get_abc', []);
        return result.stack.readNumber();
    }
}
