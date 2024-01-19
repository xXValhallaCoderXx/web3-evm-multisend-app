"use client"
import { FC, ReactNode } from "react"
import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { injected } from "wagmi/connectors";
import { useAccount, useConnect, useDisconnect } from "wagmi";

interface IMainLayoutProps {
    children: ReactNode
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
    const { disconnect } = useDisconnect();
    const { connect } = useConnect();
    const { address } = useAccount();

    const handleOnClick = () => {
        if (address) {
            disconnect()
        }
        connect({ connector: injected() })
    }

    return <div>
        <Box bgColor="red">
            <Flex p={2} justifyContent="space-between">
                <Box>
                    <Text>Multisend</Text>
                </Box>
                <Flex alignItems="center" justifyContent="space-between" gap={4}>
                    <Text fontSize="xs" >{address}</Text>
                    <Button size="xs" onClick={handleOnClick}>{address ? "DIsconnect" : "Connect"}</Button>
                </Flex>
            </Flex>
        </Box>
        {children}
    </div>
}

export default MainLayout