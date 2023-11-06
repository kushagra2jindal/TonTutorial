import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { ConstantProductDex } from '../wrappers/ConstantProductDex';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('ConstantProductDex', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('ConstantProductDex');
    });

    let blockchain: Blockchain;
    let constantProductDex: SandboxContract<ConstantProductDex>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        constantProductDex = blockchain.openContract(ConstantProductDex.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await constantProductDex.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: constantProductDex.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and constantProductDex are ready to use
    });
});
