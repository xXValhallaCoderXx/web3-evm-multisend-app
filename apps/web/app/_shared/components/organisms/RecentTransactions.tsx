import { Card, CardHeader, CardBody, Flex, Box, Text } from "@chakra-ui/react";

const RecentTransactionsCard = () => {
  const isUserSignedIn = false;
  return (
    <Card
      bgColor="secondary.700"
      borderColor="secondary.500"
      borderWidth={2}
      w="full"
    >
      <CardBody>
        <Text
          color="secondary.200"
          letterSpacing={0.9}
          fontSize="xl"
          fontWeight={600}
        >
          Recent Transactions
        </Text>
        <Flex justifyContent="center" mt={4} mb={2}>
          {!isUserSignedIn && (
            <Flex alignItems="center" flexDir="column">
              <Text color="timberwolf.100" fontWeight={600}>
                Sign in to view recent transactions
              </Text>
              <Text fontSize="sm" color="timberwolf.500" as="i">
                Connect your wallet, to see your past transactions
              </Text>
            </Flex>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default RecentTransactionsCard;
