import { Card, CardHeader, CardBody, Flex, Box, Text } from "@chakra-ui/react";

const RecentTransactionsCard = () => {
  const isUserSignedIn = false;
  return (
    <Card
      bgColor="secondary.700"
      borderColor="secondary.500"
      borderWidth={2}
      w="full"
      h="100%"
    >
      <CardBody>
        <Flex flexDir="column" h="100%">
          <Text
            color="secondary.200"
            letterSpacing={0.9}
            fontSize="xl"
            fontWeight={600}
          >
            Recent Transactions
          </Text>
          <Flex flexGrow={1} alignItems="center" justifyContent="center">
            {!isUserSignedIn && (
              <Box>
                <Text
                  textAlign="center"
                  color="timberwolf.100"
                  fontWeight={600}
                >
                  Sign in to view recent transactions
                </Text>
                <Text
                  textAlign="center"
                  fontSize="sm"
                  color="timberwolf.500"
                  as="i"
                >
                  Connect your wallet, to see your past transactions
                </Text>
              </Box>
            )}
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default RecentTransactionsCard;
