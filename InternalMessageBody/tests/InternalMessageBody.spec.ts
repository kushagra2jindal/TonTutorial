import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { InternalMessageBody } from '../wrappers/InternalMessageBody';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('InternalMessageBody', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('InternalMessageBody');
    });

    let blockchain: Blockchain;
    let internalMessageBody: SandboxContract<InternalMessageBody>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        internalMessageBody = blockchain.openContract(InternalMessageBody.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await internalMessageBody.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: internalMessageBody.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and internalMessageBody are ready to use
    });
});
