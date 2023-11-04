import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { Vault } from '../wrappers/Vault';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Vault', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Vault');
    });

    let blockchain: Blockchain;
    let vault: SandboxContract<Vault>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        vault = blockchain.openContract(Vault.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await vault.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: vault.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and vault are ready to use
    });
});
