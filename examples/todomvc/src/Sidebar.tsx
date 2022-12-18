// NOTE: adapted from <https://chakra-templates.dev/navigation/sidebar>
import type { IconType } from "react-icons";

import { ReactNode } from "react";
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ReactText } from "react";

type SidebarProps = {
  title: string;
  linkItems: LinkItem[];
  children: ReactNode;
};

type LinkItem = {
  name: string;
  path: string;
  icon: IconType;
};

const Sidebar = ({ title, linkItems, children }: SidebarProps) => (
  <>
    <Box display={{ base: "block", lg: "none" }}>
      <Alert status="info">
        <AlertIcon />
        Increase window width to make navigation visible.
      </Alert>
    </Box>
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", lg: 180 }}
        pos="fixed"
        h="full"
        display={{ base: "none", lg: "block" }}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            {title}
          </Text>
        </Flex>
        {linkItems.map((link) => (
          <NavItem key={link.name} path={link.path} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </Box>
      <Box ml={{ base: 0, lg: 180 }}>{children}</Box>
    </Box>
  </>
);

type NavItemProps = {
  path: string;
  icon: IconType;
  children: ReactText;
};

const NavItem = ({ path, icon, children, ...rest }: NavItemProps) => (
  <Link
    href={path}
    style={{ textDecoration: "none" }}
    _focus={{ boxShadow: "none" }}
  >
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: "cyan.400",
        color: "white",
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  </Link>
);

export default Sidebar;
