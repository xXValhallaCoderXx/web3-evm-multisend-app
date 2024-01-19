"use client"
import { FC, ReactNode } from "react"
import { Box } from "@chakra-ui/react"

interface IMainLayoutProps {
    children: ReactNode
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
    return <div>
        <Box bgColor="red">
            sfsd
        </Box>
        {children}
        </div>
}

export default MainLayout