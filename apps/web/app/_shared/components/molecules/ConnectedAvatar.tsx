import { FC } from "react";
import { Flex, Box } from "@chakra-ui/react";
import SplitText from "@/components/atoms/SplitText";

interface IConnectAvatarProps {
  address: string;
}

const ConnectedAvatar: FC<IConnectAvatarProps> = ({ address }) => {
  return (
    <div>
      <SplitText split={5} fontSize="xs">
        {address ?? ""}
      </SplitText>
    </div>
  );
};

export default ConnectedAvatar;
