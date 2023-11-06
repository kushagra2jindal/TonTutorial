import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { JettonTransfer } from '../wrappers/JettonTransfer';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('JettonTransfer', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('JettonTransfer');
    });

    let blockchain: Blockchain;
    let jettonTransfer: SandboxContract<JettonTransfer>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        jettonTransfer = blockchain.openContract(JettonTransfer.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await jettonTransfer.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: jettonTransfer.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and jettonTransfer are ready to use
    });
});
