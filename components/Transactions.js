import { Divider, Link, Text, useFocusEffect } from "@chakra-ui/react";
import { useMoralisWeb3Api } from "react-moralis";
import React, { useEffect } from "react";
import CustomContainer from "./CustomContainer";

export default function Transactions ({user}) {

    const Web3Api = useMoralisWeb3Api()
    const BASE_URL = "https://etherscan.io/tx/"

    const [transactions, setTransactions] = React.useState([])

    const FetchTransactions  = async () => {
        const data = await Web3Api.account.getTransactions({
            chain: "mainnet",
            address: user.get("ethAddress"),
            limit: 5
        })
        if(data){
           setTransactions(data.result)
        }
    }

    useEffect(() => {
        FetchTransactions()
    })

    console.log(transactions)
    return(
        <CustomContainer>
            <Text fontSize="xl" mb="6" fontWeight="bold">Last 5 transactions</Text>
            {transactions && transactions.map(transaction => (
                <div key={transaction.hash}>
                    <Link href={'${BASE_URL}${transaction.hash}'} isExternal>➡&nbsp; {transaction.hash}</Link>
                    <Divider />
                </div>
            ))}
        </CustomContainer>
    )
}