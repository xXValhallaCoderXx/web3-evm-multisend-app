import { FC } from "react";
import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  Input,
  Box,
  ModalCloseButton,
} from "@chakra-ui/react";
import { isAddress } from "viem";

interface IAddTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTokenModal: FC<IAddTokenModalProps> = ({ isOpen, onClose }) => {
  const onChangeText = (_e: any) => {
    if (isAddress(_e.target.value)) {
      console.log("vaaalid address");
    }
    console.log("onChangeText", _e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Token</ModalHeader>
        <ModalCloseButton />
        <ModalBody mt={-4}>
          <Text fontSize="xs" color="gray">
            Add your own ERC-20 tokens, please ensure you have added the right
            network and contract address
          </Text>
          <Box mt={2}>
            <Input onChange={onChangeText} />
          </Box>
        </ModalBody>

        <ModalFooter gap={4}>
          <Button>Add Token</Button>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTokenModal;
