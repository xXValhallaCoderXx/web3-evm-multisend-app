import React, { FC } from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  Icon,
  VStack,
  Tooltip,
  Spacer,
} from "@chakra-ui/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { FaRegClock } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";

// Custom motion component
const MotionBox = motion(Box);
const MotionIcon = motion(ChevronLeftIcon);

interface ISideMenuProps {
  isOpen: boolean;
  onClickSideMenu: () => void;
}

const SideMenu: FC<ISideMenuProps> = ({ isOpen, onClickSideMenu }) => {
  const menuItems = [
    { name: "Payments", icon: <Icon as={FaMoneyBillTransfer} /> },
    { name: "History", icon: <Icon as={FaRegClock} /> },
    { name: "Contacts", icon: <Icon as={IoMdContact} /> },
  ];

  const rotateDegrees = isOpen ? 180 : 0;

  return (
    <MotionBox
      initial={{ width: "50px" }}
      animate={{
        width: isOpen ? "170px" : "50px",
      }}
      transition={{ duration: 0.3 }}
      bg="primary.700"
      color="white"
      position="relative"
    >
      <Flex
        direction="column"
        justifyContent="space-between"
        h="100%"
        p={isOpen ? 4 : 2}
      >
        {/* Adjusted toggle button position */}
        <Box
          position="absolute"
          top="50%"
          right="-12px"
          transform="translateY(-50%)"
        >
          <IconButton
            aria-label="Toggle menu"
            icon={
              <MotionIcon fontSize={24} animate={{ rotate: rotateDegrees }} />
            }
            size="xs"
            py={5}
            colorScheme="accent"
            onClick={onClickSideMenu}
          />
        </Box>

        <VStack align={isOpen ? "flex-start" : "center"} flexGrow={1}>
          <Flex pt={isOpen ? 0 : 2} gap={2}>
            <Image
              src="/images/icons/logo-main.png"
              alt="logo"
              height={20}
              width={30}
            />
            {isOpen && (
              <Text
                letterSpacing={0.7}
                w="140px"
                color="white"
                fontWeight="bold"
                fontSize="xl"
              >
                C<span style={{ fontSize: 14 }}>hain</span>B
                <span style={{ fontSize: 14 }}>atch</span>X
              </Text>
            )}
          </Flex>

          <VStack
            alignItems="flex-start"
            mt={isOpen ? 5 : 6}
            pl={isOpen ? 1 : 0}
            spacing={isOpen ? 4 : 4}
          >
            {isOpen
              ? menuItems.map((item) => (
                  <Flex key={item.name} alignItems="center" gap={2}>
                    {item.icon}
                    <Text>{item.name}</Text>
                  </Flex>
                ))
              : menuItems.map((item) => (
                  <Tooltip label={item.name} key={item.name}>
                    <div>{item.icon}</div>
                  </Tooltip>
                ))}
          </VStack>
          <Spacer />
          {isOpen && (
            <Flex alignItems="center" gap={2}>
              <Icon as={FiSettings} />
              <Text>Settings</Text>
            </Flex>
          )}
        </VStack>
        {!isOpen && (
          <Box position="absolute" bottom="4">
            <Tooltip label="Settings">
              <Icon as={FiSettings} />
            </Tooltip>
          </Box>
        )}
      </Flex>
    </MotionBox>
  );
};

export default SideMenu;
