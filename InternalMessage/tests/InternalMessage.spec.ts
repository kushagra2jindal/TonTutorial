import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { InternalMessage } from '../wrappers/InternalMessage';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('InternalMessage', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('InternalMessage');
    });

    let blockchain: Blockchain;
    let internalMessage: SandboxContract<InternalMessage>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        internalMessage = blockchain.openContract(InternalMessage.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await internalMessage.sendDeploy(deployer.getSender(), toNano('0.5'));
        console.log(deployResult)

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: internalMessage.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and internalMessage are ready to use
    });

    // it('should increase counter', async () => {
    
    //     const sender = await blockchain.treasury('sender');
    //     console.log(sender)
    //     // const transferResult = await InternalMessage.sendTransfer(sender.getSender(), {
    //     //     value: toNano('0.003'),
    //     // });

    //     // expect(transferResult.transactions).toHaveTransaction({
    //     //     from: sender.address,
    //     //     to: internalMessage.address,
    //     //     success: true,
    //     // });

    // });
});
