import { Flex, Center, Text, Button, Image } from "@chakra-ui/react";

export default function Header({user, logout, isLoggingOut}) {
    return(
        <header>
            <Flex px="10" py="6" justifyContent="space-between" bg="black" color="white">
                <Center>
                    {/* <Text fontSize="xl" fontWeight="bold">
                        
                    </Text> */}
                    <Image src="../logo.png" alt="logo" width="30" height="10"/>
                </Center>
                
                <Center>
                    <Text>{user.getUsername()}</Text>
                    <Button ml="4" colorScheme="yellow" onClick={logout} disabled={isLoggingOut}>Logout</Button>
                </Center>
            </Flex>
        </header>
    )
}