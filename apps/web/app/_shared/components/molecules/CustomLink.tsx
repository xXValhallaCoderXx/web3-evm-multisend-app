"use client";
import { FC } from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { Link, Box, Text, Icon } from "@chakra-ui/react";

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
  icon,
  showText = true,
}) => {
  const pathname = usePathname();
  const MotionText = motion(Text);

  // Check if the link is active
  const isActive = pathname === href;

  return (
    <NextLink href={href} passHref>
      <Link
        _hover={{
          textDecoration: "none",
          color: "primary.200", // Change text/icon color on hover
        }}
        display="flex"
        alignItems="center"
        height="40px"
        color={isActive ? "secondary.600" : "secondary.300"} // Active or default color
      >
        <Icon as={icon} fontSize={18} mr={showText ? 1 : 0} />
        <MotionText variants={textVariants}>{children}</MotionText>
      </Link>
    </NextLink>
  );
};

export default CustomLink;
