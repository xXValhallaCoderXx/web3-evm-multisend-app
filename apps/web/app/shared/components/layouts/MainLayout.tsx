"use client"
import { FC, ReactNode, useEffect } from "react"
import { Box, Button, Flex, Text, Select } from "@chakra-ui/react"
import { injected } from "wagmi/connectors";
import { useToast } from '@chakra-ui/react'
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";

interface IMainLayoutProps {
    children: ReactNode
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
    const { disconnect } = useDisconnect();
    const { connect } = useConnect();
    const toast = useToast()
    const { chains, switchChain, isError: isSwitchError, isPending: isSwitchPaused, isSuccess: isSwitchSuccess, error, ...rest } = useSwitchChain()
    const { address, chainId } = useAccount();

    useEffect(() => {
        if (isSwitchSuccess) {
            toast({
                title: 'Action Success',
                // @ts-ignore
                description: "Switched network",
                status: 'success',
                duration: 2500,
                isClosable: true,
            })
        }

        if (isSwitchError) {
   
            toast({
                title: 'Wallet Action Rejected',
                // @ts-ignore
                description: error?.cause?.message,
                status: 'error',
                duration: 3500,
                isClosable: true,
            })
        }
    }, [isSwitchSuccess, isSwitchError])

    const handleOnClick = () => {
        if (address) {
            disconnect()
        }
        connect({ connector: injected() })
    }

    const parseChainOptions = () => {
        if (chains?.length > 0) {
            return chains?.map(chain => ({
                value: chain?.id,
                label: chain?.name
            }))
        }
        return []
    }

    const handleOnChangeChain = (e: any) => {

        switchChain({ chainId: parseInt(e.target.value) })
    }
    console.log("CHAIN ID: ", rest)
    return <div>
        <Box >
            <Flex p={2} justifyContent="space-between">
                <Box>
                    <Text>Multisend</Text>
                </Box>
                <Flex alignItems="center" justifyContent="space-between" gap={4}>
                    {address && <Select onChange={handleOnChangeChain} defaultValue={chainId} w={140} size="xs" placeholder='Select Network'>
                        {parseChainOptions().map(chain => <option value={chain?.value}>{chain?.label}</option>)}
                    </Select>}
                    <Text fontSize="xs" >{address}</Text>
                    <Button size="xs" onClick={handleOnClick}>{address ? "DIsconnect" : "Connect"}</Button>
                </Flex>
            </Flex>
        </Box>
        {children}
    </div>
}

export default MainLayout