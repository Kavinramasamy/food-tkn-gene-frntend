import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";

const OrderFoods = () => {
  const { food_name, price, _id } = JSON.parse(
    localStorage["food-order-values"]
  );
  const navTo = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState("");

  const fieldValidationSchema = yup.object({
    table_number: yup.number().required(),
    email: yup.string().required(),
    user_name: yup.string().required(),
    order_id: yup.string().required(),
    phone_number: yup.number().required(),
  });
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      table_number: "",
      email: "",
      price: price,
      order_id: _id,
      phone_number: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: async (foodInfo) => {
      try {
        console.log(foodInfo);
        setLoading(true);
        foodInfo.veg = foodInfo.veg === "true" ? true : false;
        await axios
          .post("https://new-project-0xul.onrender.com/order", foodInfo)
          .then((res) => {
            setLoading(false);
            navTo("/foodmenu");
            console.log(res);
          })

          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      } catch (error) {
        setLoading(false);
        console.log("Error", error);
      }
    },
  });
  return (
    <Flex className="text-dark" align={"center"} justify={"center"}>
      <Stack
        textAlign={"center"}
        spacing={50}
        mx={"auto"}
        maxW={"lg"}
        py={10}
        px={10}
        w={"100%"}
      >
        <Box
          rounded={"lg"}
          border={"1px solid gray"}
          borderRadius={"15px"}
          boxShadow={"lg"}
          p={5}
        >
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Order Food
            </Heading>
          </Stack>
          <Stack spacing={4}>
            <FormControl id="table_number" isRequired>
              <FormLabel>Food Name</FormLabel>
              <Input
                type="text"
                id="food_name"
                p={2}
                onChange={handleChange}
                borderColor={errors.food_name ? "red.500" : "gray"}
                placeholder={errors.food_name ? "required" : "Food Name"}
                value={food_name}
                disabled
              />
            </FormControl>
            <FormControl id="price" isRequired>
              <FormLabel>Price ₹</FormLabel>
              <Input
                type="text"
                id="price"
                p={2}
                onChange={handleChange}
                borderColor={errors.price ? "red.500" : "gray"}
                placeholder={errors.price ? "required" : "Price"}
                value={values.price}
                disabled
              />
            </FormControl>
            <FormControl id="user_name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                id="user_name"
                p={2}
                onChange={handleChange}
                borderColor={errors.user_name ? "red.500" : "gray"}
                placeholder={errors.user_name ? "required" : "Enter your name"}
                value={values.user_name}
              />
            </FormControl>
            <FormControl id="table_number" isRequired>
              <FormLabel>Table_Number</FormLabel>
              <Input
                type="text"
                id="table_number"
                p={2}
                onChange={handleChange}
                borderColor={errors.table_number ? "red.500" : "gray"}
                placeholder={
                  errors.table_number ? "required" : "Enter table_number"
                }
                value={values.table_number}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                id="email"
                p={2}
                onChange={handleChange}
                borderColor={errors.email ? "red.500" : "gray"}
                placeholder={errors.email ? "required" : "Enter email"}
                value={values.email}
              />
            </FormControl>
            <FormControl id="phone_number" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="number"
                id="phone_number"
                p={2}
                onChange={handleChange}
                borderColor={errors.phone_number ? "red.500" : "gray"}
                placeholder={
                  errors.phone_number ? "required" : "Enter Phone Number"
                }
                value={values.phone_number}
              />
            </FormControl>

            <Flex justifyContent={"center"}>
              {loading && (
                <Button
                  isLoading={true}
                  onClick={handleSubmit}
                  size="lg"
                  w={"80%"}
                  bg={"yellow"}
                  color={"dark"}
                >
                  Order
                </Button>
              )}
              {!loading && (
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  bg={"pink"}
                  color={"dark"}
                  w={"80%"}
                >
                  Order
                </Button>
              )}
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default OrderFoods;
