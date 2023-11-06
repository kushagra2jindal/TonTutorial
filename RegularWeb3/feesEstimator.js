function storageFeeCalculator() {

    const size = 1024 * 1024 * 8    // Per bit~!!
    const duration = 60 * 60 * 24   // Per day~!!

    const bit_price_ps = 1
    const cell_price_ps = 500

    const pricePerSec = size * bit_price_ps +
        + Math.ceil(size / 1023) * cell_price_ps

    let fee = (pricePerSec * duration / 2 ** 16 * 10 ** -9)
    let mb = (size / 1024 / 1024 / 8).toFixed(2)
    let days = Math.floor(duration / (3600 * 24))

    let str = `Storage Fee: ${fee} TON (${mb} MB for ${days} days)`

    console.log(str);
}

storageFeeCalculator();