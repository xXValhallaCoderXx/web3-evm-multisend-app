import {
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  Text,
  Flex,
} from "@chakra-ui/react";
import { FC } from "react";

interface ILoadingOverlayProps {
  isLoading: boolean;
  text?: string;
}

const LoadingOverlay: FC<ILoadingOverlayProps> = ({ isLoading, text }) => {
  return (
    <Modal isOpen={isLoading} onClose={() => {}} isCentered>
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent backgroundColor="transparent" boxShadow="none" m={0}>
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          h="100vh"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          {text && <Text mt={4}>{text}</Text>}
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default LoadingOverlay;
