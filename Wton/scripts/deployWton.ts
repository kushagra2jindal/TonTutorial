import { Sha256 } from "@aws-crypto/sha256-js";
import { Address, beginCell, toNano, Dictionary } from 'ton-core';
import { Wton } from '../wrappers/Wton';
import { compile, NetworkProvider } from '@ton-community/blueprint';

const ONCHAIN_CONTENT_PREFIX = 0x00;
const SNAKE_PREFIX = 0x00;
const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);

const bufferToChunks = (buff: Buffer, chunkSize: number) =>  {
    let chunks: Buffer[] = [];
    while (buff.byteLength > 0) {
        chunks.push(buff.slice(0, chunkSize));
        buff = buff.slice(chunkSize);
    }
    return chunks;
}

const makeSnakeCell = (data: Buffer) => {
    // Create a cell that package the data
    let chunks = bufferToChunks(data, CELL_MAX_SIZE_BYTES);

    const b = chunks.reduceRight((curCell, chunk, index) => {
        if (index === 0) {
            curCell.storeInt(SNAKE_PREFIX, 8);
        }
        curCell.storeBuffer(chunk);
        if (index > 0) {
            const cell = curCell.endCell();
            return beginCell().storeRef(cell);
        } else {
            return curCell;
        }
    }, beginCell());
    return b.endCell();
}

const sha256 = (str: string) => {
    const sha = new Sha256();
    sha.update(str);
    return Buffer.from(sha.digestSync());
};

const toKey = (key: string) => {
    return BigInt(`0x${sha256(key).toString("hex")}`);
};


export async function run(provider: NetworkProvider) {
    const data = {
        name: "WTONKJ",
        symbol: "WTONKJ",
        description: "Wrap Token Sample Contract!!",
        image: "https://cache.tonapi.io/imgproxy/kmZ2_jWomjdmp4Iy7TK19AnEYEqAW7XfvDZq8QCqUxU/rs:fill:200:200:1/g:no/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3RvbmtlZXBlci9vcGVudG9uYXBpL21hc3Rlci9wa2cvcmVmZXJlbmNlcy9tZWRpYS90b2tlbl9wbGFjZWhvbGRlci5wbmc.webp"
    }
    let dict = Dictionary.empty(
        Dictionary.Keys.BigUint(256),
        Dictionary.Values.Cell()
    );

    Object.entries(data).forEach(([key, value]) => {
        dict.set(toKey(key), makeSnakeCell(Buffer.from(value, "utf8")));
    });

    const wton = provider.open(Wton.createFromConfig({
        adminAddress: provider.sender().address as Address,
        content: beginCell().storeInt(ONCHAIN_CONTENT_PREFIX, 8).storeDict(dict).endCell(),
        jettonWalletCode: await compile('Wallet')
    }, await compile('Wton')));

    await wton.sendDeploy(provider.sender(), toNano('0.1'));

    await provider.waitForDeploy(wton.address);

    // run methods on `wton`
}
