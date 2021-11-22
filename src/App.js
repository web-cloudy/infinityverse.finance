import React, { useEffect, useState } from 'react'
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { ethers } from 'ethers'
import Web3 from 'web3'
import Web3Modal from "web3modal";

import USDCCont from "./ABI/USDCCont.json";
import saleCont from "./ABI/saleCont.json";
const USDCAddr = "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664";
const saleAddr = "0x269b2fCfc5CF34407d8E95590EC70dBB483035e2";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function App() {
    const [open, setOpen] = useState(false);
    const [saleAmount, setSaleAmount] = useState(0)

    useEffect(() => {
        const web3 = new Web3(Web3.givenProvider);
        async function initWallet() {
            try {
                const chainId = await web3.eth.getChainId();
                console.log(chainId)
                if (chainId === 43114) {
                    const web3Modal = new Web3Modal();
                    const connection = await web3Modal.connect();
                    const provider = new ethers.providers.Web3Provider(connection);
                    // const signer = provider.getSigner();
                    // const myAddr = signer.provider.provider.selectedAddress;
                    // alert("successfully connected!")
                } else {
                    try {
                        await web3.currentProvider.request({
                            method: "wallet_switchEthereumChain",
                            params: [{ chainId: "0xA86A" }]
                        });
                    } catch (error) {
                        if (error.code === 4902) {
                            try {
                                await web3.currentProvider.request({
                                    method: "wallet_addEthereumChain",
                                    params: [
                                        {
                                            chainId: "0xA86A",
                                            chainName: "Avalanche Mainnet",
                                            rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
                                            blockExplorerUrls: ["https://snowtrace.io"],
                                        },
                                    ],
                                });
                            } catch (error) {
                                alert(error.message);
                            }
                        }
                    }
                }
            } catch (err) {
                console.log(err);
                alert("add metamask");
            }
        }
        initWallet();
    }, [])
    const saleVerse = async () => {
        const web3 = new Web3(Web3.givenProvider);
        let USDCContract;
        let saleContract;
        try {
            const chainId = await web3.eth.getChainId()
            if (chainId === 43114) {
                const web3Modal = new Web3Modal();
                const connection = await web3Modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer = provider.getSigner();
                // const myAddr = signer.provider.provider.selectedAddress;
                console.log(signer);
                console.log(provider);
                USDCContract = new ethers.Contract(
                    USDCAddr,
                    USDCCont.abi,
                    signer
                );
                saleContract = new ethers.Contract(
                    saleAddr,
                    saleCont.abi,
                    signer
                );
                if (saleAmount > 0) {
                    const USDCCon = await USDCContract.approve(saleAddr, saleAmount * Math.pow(10, 6));
                    await USDCCon.wait();
                    const saleCon = await saleContract.buyVerseToken(saleAmount);
                    await saleCon.wait();
                    alert("successfully buyed")
                } else {
                    alert("Input amount of sale!");
                }

            } else {
                // alert('The wrong network, please switch to the Avalanche network.')
                try {
                    await web3.currentProvider.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0xA86A" }]
                    });
                } catch (error) {
                    alert(error.message);
                }
            }
        } catch (err) {
            console.log(err)
            alert("insufficient money")
        }

    }
    return (
        <div className="main">
            <div className="container">
                <div>
                    <div className="title">
                        <div className="a">Verse Token Presale</div>
                        <div className="b">Limited Supply Available</div>
                    </div>
                    <div className="social-icons">
                        <div className="icon">
                            <a href="https://discord.gg/Rt4eheWp" rel="noreferrer" target="_blank"><i className="fab fa-discord"></i></a>
                        </div>
                        <div className="icon">
                            <a href="https://t.me/versetokenpresale" rel="noreferrer" target="_blank"><i className="fab fa-telegram"></i></a>
                        </div>
                    </div>
                </div>
                <div>
                    {/* <div className="timer">00:00:00</div> */}
                    <button className="btn" id="buy" onClick={() => setOpen(true)}>Buy now</button>
                </div>
                <div className="read-more-area">
                    <span className="text">Read More</span>
                    <div className="arrow-down"></div>
                </div>
            </div>
            <div className="documents">
                <div className="back-section">
                    <div className="arrow-up"></div>
                    Back
                </div>
                <h2><span className="verse-medium dark"></span> Verse Token</h2>
                <div className="content">
                    - Total Supply = 5 million<br />
                    - 100K verse TOKEN'S IN PRESALE WILL BE A RATIO of 1:1. PRESALE PRICE = $1 PER VERSE TOKEN. Presale Holders will gain early access to the farm and the physical shop.<br />
                    - 10% locked supply for 4 months totaling 500k verse tokens. Once the 4 months has passed from the initial launch, 50k verse tokens will be burned and 50k verse tokens will be airdropped. 5,000 verse tokens will be given to OG holders of the Infinity Stoners collection. 5,000 verse tokens will be given to OG holders of the Infinity Citizens collection. 20,000 verse tokens will be airdropped to the whole community. 4,000 verse tokens will be airdropped to the first 8 holders of the comic book NFTs. 16,000 verse tokens will be given overtime in portions to participents in the community chats.<br />
                    - NFTs will be available at launch for all users.<br />
                    - Fee free/tax free token.<br />
                    - 0% farm deposit fee.<br />
                    - A portion of the proceedings from the physical shop will be used as a buy back mechanism.<br />
                    - 400k verse tokens will be divided between the founders, co-founders, alliances and the community.<br />
                    <br />
                    <u>Marketplace features:</u><br />
                    - Farm<br />
                    - NFTs<br />
                    - Physical Item Shop and more.<br />
                    <br />
                    Platform launch date: 12/20/2021<br />
                    NFT launch date: 12/20/2021<br />
                    Farm launch date: 12/20/2021<br />
                    <br />
                    The VERSE TOKEN can be used on the INFINITY VERSE platform.<br />
                    <br />
                    <u>FUTURE DEVELOPING</u><br />
                    - Priority 1: Dex<br />
                    - Priority 2: Game<br />
                    - Priority 3: 3D Verse<br />
                    - Priority 4: Bridge<br />
                    <br />
                    100% of the proceedings that will be gathered from the prelaunch event will be invested towards improving the project.
                </div>
                <div className="credit">
                    Made by <a href="https://www.instagram.com/professor.dev/" rel="noreferrer" target="_blank">Professor</a>
                </div>
            </div>
            <Button onClick={() => setOpen(true)}>Open modal</Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{ textAlign: "center" }}>
                    <TextField id="filled-basic" label="Filled" variant="filled" type="number" onChange={(e) => {
                        setSaleAmount(e.target.value)
                        console.log(e.target.value)
                    }} />
                    <br />
                    <br />
                    <br />
                    <Button variant="contained" onClick={() => saleVerse()} disableElevation>
                        Buy Now
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default App;
