import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
  FormControl,
  useToast
} from '@chakra-ui/react';
import {
  Flex,
  Spacer,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Divider,
  Button,
  IconButton,
  Avatar,
  HStack,
  useColorMode,
  useColorModeValue,
  Box,
  MenuGroup,
  Heading
} from '@chakra-ui/react';
import { VscBell } from 'react-icons/vsc';
import { BiSupport } from 'react-icons/bi';
import { Indicator } from '@mantine/core';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';
import {
  AiOutlineShoppingCart,
  AiFillDelete,
  AiOutlinePlus,
  AiOutlineMinus
} from 'react-icons/ai';
import { MdArrowDropUp, MdArrowDropDown, MdExitToApp } from 'react-icons/md';

import { Logo } from './';
import NextLink from 'next/link';
import { useAuth } from '@modules/auth';
import { useCart } from '@common/hooks';
import { NAVBAR_HEIGHT } from '@common/constants';
import { Link } from '@common/components';
import { useState } from 'react';
import { type CartItem } from '@common/types';

export const CartMenu = () => {
  const { user, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart();

  return (
    <Menu closeOnBlur={false}>
      <Indicator
        label={cart.length === 0 ? '' : cart.length}
        size={cart.length === 0 ? 0 : 16}
        color="red"
      >
        <MenuButton
          as={IconButton}
          variant="ghost"
          icon={<AiOutlineShoppingCart size="20px" />}
          aria-label="Shopping Cart"
        />
      </Indicator>

      <MenuList pt={4} pb={6} px={6} borderRadius="xl" minW="300px">
        <MenuGroup>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={2}
            px={2}
          >
            <Heading size="xs" fontWeight="semibold">
              My Cart{' '}
              <Text as="span" color="gray.500">
                ({cart.length})
              </Text>
            </Heading>
            <Link href="/cart" fontSize="sm" color="blue.300" mb="3px">
              View All
            </Link>
          </Box>
          {cart.map(({ id, name, price, quantity }) => (
            <Flex key={id} flexDir="column" mt={4}>
              <Heading size="md">
                {name} <Text as="span">x {quantity}</Text>
              </Heading>
              <Text color="gray.400">${price.toFixed(2)}</Text>
              <Flex justifyContent="space-between" alignItems="center" mt={4}>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Increase Quantity"
                    size="sm"
                    onClick={() => increaseQuantity(id)}
                  >
                    <AiOutlinePlus />
                  </IconButton>
                  <IconButton
                    aria-label="Decrease Quantity"
                    size="sm"
                    onClick={() => decreaseQuantity(id)}
                  >
                    <AiOutlineMinus />
                  </IconButton>
                </HStack>
                <IconButton
                  aria-label="Remove from Cart"
                  size="sm"
                  colorScheme="red"
                  onClick={() => removeFromCart(id)}
                >
                  <AiFillDelete />
                </IconButton>
              </Flex>
            </Flex>
          ))}
          {cart.length === 0 && (
            <Text textAlign="center" fontSize="sm" color="gray.300">
              Your cart is empty
            </Text>
          )}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
