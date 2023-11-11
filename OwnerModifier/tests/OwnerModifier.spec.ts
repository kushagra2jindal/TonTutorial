import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { OwnerModifier } from '../wrappers/OwnerModifier';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('OwnerModifier', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('OwnerModifier');
    });

    let blockchain: Blockchain;
    let ownerModifier: SandboxContract<OwnerModifier>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        ownerModifier = blockchain.openContract(OwnerModifier.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await ownerModifier.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: ownerModifier.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and ownerModifier are ready to use
    });
});
