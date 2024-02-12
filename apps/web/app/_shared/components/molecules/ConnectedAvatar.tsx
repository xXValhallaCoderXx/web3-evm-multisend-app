import { FC } from "react";
import {
  Flex,
  Box,
  forwardRef,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import SplitText from "@/components/atoms/SplitText";

interface IConnectAvatarProps {
  address: string;
}

const CustomMenuButton = forwardRef((props, ref) => {
  return (
    <Flex
      borderColor="accent.400"
      borderWidth={2}
      px={2}
      py={1}
      borderRadius={10}
      ref={ref}
      {...props}
    >
      {props.children}
    </Flex>
  );
});

const ConnectedAvatar: FC<IConnectAvatarProps> = ({ address }) => {
  return (
    <div>
      <Menu>
        <MenuButton as={CustomMenuButton}>
          <Flex gap={2}>
            <Flex alignItems="center">
              <Avatar size="xs" />
            </Flex>
            <Flex flexDir="column">
              <SplitText color="white" fontWeight={600} split={5} fontSize="sm">
                {address}
              </SplitText>
              <Text
                color="timberwolf.300"
                mt={-1}
                textAlign="right"
                fontSize={10}
              >
                999.999 ETH
              </Text>
            </Flex>
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuGroup title="Profile">
            <MenuItem>My Account</MenuItem>
            <MenuItem>Payments </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Help">
            <MenuItem>Docs</MenuItem>
            <MenuItem>FAQ</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </div>
  );
};

export default ConnectedAvatar;
