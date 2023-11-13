import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { Wton } from '../wrappers/Wton';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Wton', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Wton');
    });

    let blockchain: Blockchain;
    let wton: SandboxContract<Wton>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        wton = blockchain.openContract(Wton.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await wton.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: wton.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and wton are ready to use
    });
});
