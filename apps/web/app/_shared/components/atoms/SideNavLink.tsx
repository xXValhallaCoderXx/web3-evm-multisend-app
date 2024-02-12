import { FC } from "react";
import { Text } from "@chakra-ui/react";

interface ISideNavLinkProps {
  url: string;
  label: string;
  onClickRoute: any;
}

const SideNavLink: FC<ISideNavLinkProps> = ({ url, onClickRoute, label }) => {
  const handleOnClick = (_url: string) => () => {
    onClickRoute(_url);
  };
  return (
    <Text
      onClick={handleOnClick(url)}
      variant="ghost"
      fontSize={14}
      color="timberwolf.300"
      _hover={{
        cursor: "pointer",
        color: "timberwolf.100",
      }}
    >
      {label}
    </Text>
  );
};

export default SideNavLink;
