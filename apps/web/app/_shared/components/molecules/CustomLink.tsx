"use client";
import { FC } from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { Link, Box, Text } from "@chakra-ui/react";

interface ICustomLink {
  href: string;
  children: React.ReactNode;
  icon: any;
  showText?: boolean;
}

const textVariants = {
  open: { opacity: 1, x: 0, transition: { delay: 0.2 } }, // Delayed appearance
  closed: { opacity: 0, x: -20, transition: { duration: 0.2 } }, // Starts hidden and moves in
};

const CustomLink: FC<ICustomLink> = ({
  href,
  children,
  icon: Icon,
  showText = true,
}) => {
  const pathname = usePathname();
  const MotionText = motion(Text);

  // Check if the link is active
  const isActive = pathname === href;

  return (
    <NextLink href={href} passHref>
      <Link
        display="flex" // Align icon and text horizontally
        alignItems="center" // Center items vertically
        justifyContent={showText ? "flex-start" : "center"} // Center icon if no text
        px={2}
        py={1}
        _hover={{
          textDecoration: "none",
          color: "red.500", // Change text/icon color on hover
        }}
        color={isActive ? "blue.100" : "gray.600"} // Active or default color
        height="40px" // Example fixed height for consistency
      >
        {Icon && (
          <Box
            as={Icon}
            ml={showText ? -2 : 7}
            _hover={{}}
            mr={showText ? 2 : 0}
          />
        )}
        <MotionText mb={showText ? 0 : 0} variants={textVariants}>
          {children}
        </MotionText>
      </Link>
    </NextLink>
  );
};

export default CustomLink;
