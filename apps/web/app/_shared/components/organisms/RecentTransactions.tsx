import { Card, CardHeader, CardBody, Flex, Box, Text } from "@chakra-ui/react";

const RecentTransactionsCard = () => {
  const isUserSignedIn = false;
  return (
    <Card bgColor="#201B43" w="full">
      <CardBody>
        <Text fontSize="xl" fontWeight={600}>
          Recent Transactions
        </Text>
        <Flex justifyContent="center" mt={4} mb={2}>
          {!isUserSignedIn && (
            <Flex alignItems="center" flexDir="column">
              <Text as="i">Sign in to view recent transactions</Text>
              <Text fontSize="sm" color="gray">
                Create an account to keep track of your recent transactions
              </Text>
            </Flex>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default RecentTransactionsCard;
