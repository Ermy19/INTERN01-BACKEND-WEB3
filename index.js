require('dotenv').config();
const express = require('express');
const Moralis = require('moralis').default;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

Moralis.start({
    apiKey: process.env.MORALIS_API_KEY
});

app.get('/nft/:walletAddress', async (req, res) => {
    try {
        const { walletAddress } = req.params;

        const response = await Moralis.EvmApi.nft.getWalletNFTs({
            address: walletAddress,  
            chain: "0x1"
        });

        res.json(response.result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/balance/:walletAddress', async (req, res) => {
    try {
        const { walletAddress } = req.params;

        const response = await Moralis.EvmApi.balance.getNativeBalance({
            address: walletAddress,  
            chain: "0x1"
        });

        res.json({
            balance: response.result.balance,
            formatted: response.result.balance / 1e18
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});