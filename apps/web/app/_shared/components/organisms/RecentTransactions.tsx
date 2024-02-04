import { Card, CardHeader, CardBody, Flex, Box, Text } from "@chakra-ui/react";

const RecentTransactionsCard = () => {
  const isUserSignedIn = false;
  return (
    <Card bgColor="#201B43" w="full">
      <CardBody>
        <Text color="white" fontSize="xl" fontWeight={600}>
          Recent Transactions
        </Text>
        <Flex justifyContent="center" mt={4} mb={2}>
          {!isUserSignedIn && (
            <Flex alignItems="center" flexDir="column">
              <Text color="white" as="i">
                Sign in to view recent transactions
              </Text>
              <Text fontSize="sm" color="gray">
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
