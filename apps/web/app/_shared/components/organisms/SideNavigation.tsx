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
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { FaRegClock } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import Link from "@/components/molecules/CustomLink";

// Custom motion component
const MotionBox = motion(Box);
const MotionIcon = motion(ChevronLeftIcon);
const MotionText = motion(Text);

interface ISideMenuProps {
  isOpen: boolean;
  onClickSideMenu: () => void;
}

const textVariants = {
  open: { opacity: 1, x: 0, transition: { delay: 0.2 } }, // Delayed appearance
  closed: { opacity: 0, x: -20, transition: { duration: 0.2 } }, // Starts hidden and moves in
};

const menuVariants = {
  open: { width: 170 },
  closed: { width: 55 },
};

const SideMenu: FC<ISideMenuProps> = ({ isOpen, onClickSideMenu }) => {
  const pathname = usePathname();
  const menuItems = [
    {
      name: "Payments",
      icon: FaMoneyBillTransfer,
      href: "/app/multisend/native",
    },
    {
      name: "History",
      icon: FaRegClock,
      href: "/app/transaction-history",
    },
    {
      name: "Contacts",
      icon: IoMdContact,
      href: "/app/contacts",
    },
  ];

  const rotateDegrees = isOpen ? 180 : 0;
  console.log("PATH ANEM", pathname);
  return (
    <MotionBox
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      transition={{ duration: 0.3 }}
      bg="primary.700"
      color="white"
      position="relative"
      bgColor="white"
    >
      <Flex pt={4} bg="primary.700" pl={4} direction="column" h="100%">
        <Box
          id="toggle-button"
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

        <Flex height={26} gap={1}>
          <Image
            src="/images/icons/logo-main.png"
            alt="logo"
            height={22}
            width={26}
          />
          {isOpen && (
            <Text
              letterSpacing={0.7}
              w="140px"
              color="white"
              fontWeight="bold"
              fontSize="lg"
            >
              C<span style={{ fontSize: 14 }}>hain</span>B
              <span style={{ fontSize: 14 }}>atch</span>X
            </Text>
          )}
        </Flex>
        <Flex
          ml={-1}
          pt={2.5}
          grow={1}
          flexDir="column"
          justifyContent="space-between"
        >
          <Flex flexDir="column" pl={2}>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                showText={isOpen}
                href={item.href}
                icon={item.icon}
              >
                {item.name}
              </Link>
            ))}
          </Flex>

          <Flex pl={2}>
            {" "}
            <Link showText={isOpen} href={"/app/settings"} icon={FiSettings}>
              Settings
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </MotionBox>
  );
};

export default SideMenu;

{
  /* {isOpen
              ? menuItems.map((item, index) => (
                  <Link key={index} href={item.href} icon={item.icon}>
                    {item.name}
                  </Link>
                  // <Flex key={item.name} alignItems="center" gap={2}>
                  //   {item.icon}
                  //   <MotionText variants={textVariants}>{item.name}</MotionText>
                  // </Flex>
                ))
              : menuItems.map((item, index) => (
                  <Tooltip  label={item.name} key={item.name}>
                    <Link
                      key={index}
                      showText={false}
                      href={item.href}
                      icon={item.icon}
                    >
                      {item.name}
                    </Link>
                  </Tooltip>
                ))} */
}


/*

 <VStack
          bgColor="red"
          // align={isOpen ? "flex-start" : "center"}
          flexGrow={1}
        >
          <Flex bgColor={"green"} gap={1}>
            <Image
              src="/images/icons/logo-main.png"
              alt="logo"
              height={22}
              width={26}
            />
            {/* {isOpen && (
              <Text
                letterSpacing={0.7}
                w="140px"
                color="white"
                fontWeight="bold"
                fontSize="lg"
              >
                C<span style={{ fontSize: 14 }}>hain</span>B
                <span style={{ fontSize: 14 }}>atch</span>X
              </Text>
            )} 
            </Flex>

            <VStack
              mt={5}
  
              // mt={isOpen ? 5 : 6}
              // pl={isOpen ? 1 : 0}
              // spacing={isOpen ? 4 : 4}
            >
           
            </VStack>
            <Spacer />
            {/* {isOpen && (
              <Flex alignItems="center" gap={2} pl={0.5}>
                <Icon as={FiSettings} />
                <MotionText variants={textVariants}>Settings</MotionText>
              </Flex>
            )} 
          </VStack>
  
          {!isOpen && (
            <Box>
              <Tooltip label="Settings">
                <Icon as={FiSettings} />
              </Tooltip>
            </Box>
          )}

          */