import { Box, Flex, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import { useSelector } from "react-redux";

interface LayoutProps {
    children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
    const address = useSelector((state: any) => state.address)

    return (
        <Flex bg="Background" minH="100vh" height="100%" flexDirection="column" alignItems="center" >
                <Box position="absolute" top="50px" right="150px">
                {address && <Text color="pink.main">{`${address.substring(0,4)}...${address.substring(address.length-5, address.length)}`}</Text>}
                </Box>
            <Box maxWidth="697px" mt={"120px"} width="100%">
                {children}
            </Box>
        </Flex>
    )
}

export default Layout