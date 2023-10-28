import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { JettonTest } from '../wrappers/JettonTest';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';
 
describe('JettonTest', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('JettonTest');
    });

    let blockchain: Blockchain;
    let jettonTest: SandboxContract<JettonTest>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        jettonTest = blockchain.openContract(JettonTest.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await jettonTest.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: jettonTest.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and jettonTest are ready to use
    });

    // it('should increase counter', async () => {
    
    //     const sender = await blockchain.treasury('sender');
    //     // console.log(sender)
    //     const transferResult = await internalMessage.sendTransfer(sender.getSender(), {
    //         value: toNano('0.003'),
    //     });

    //     expect(transferResult.transactions).toHaveTransaction({
    //         from: sender.address,
    //         to: internalMessage.address,
    //         success: true,
    //     });

    // });
});
