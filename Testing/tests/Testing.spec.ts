import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { Testing } from '../wrappers/Testing';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Testing', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Testing');
    });

    let blockchain: Blockchain;
    let testing: SandboxContract<Testing>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        testing = blockchain.openContract(Testing.createFromConfig({
            id: 1,
            abc: 123456
        }, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await testing.sendDeploy(deployer.getSender(), toNano('0.05'));

        // console.log(deployResult)

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: testing.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and testing are ready to use
    });

    it('update the storage value', async() => {
        const updater = await blockchain.treasury('updater');
        console.log("Initial Value is ==> ", await testing.getAbc());
        const txn = await testing.sendUpdateStorage(updater.getSender(), {
            increaseBy: 100,
            value: toNano('0.05')
        });
        // console.log(txn);
        console.log("Updated Value is ==> ", await testing.getAbc());
        expect(await testing.getAbc()).toEqual(100);
    })
});
