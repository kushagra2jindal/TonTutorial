import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { EnhancedJetton } from '../wrappers/JettonMinter';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('EnhancedJetton', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('EnhancedJetton');
    });

    let blockchain: Blockchain;
    let enhancedJetton: SandboxContract<EnhancedJetton>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        enhancedJetton = blockchain.openContract(EnhancedJetton.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await enhancedJetton.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: enhancedJetton.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and enhancedJetton are ready to use
    });
});
