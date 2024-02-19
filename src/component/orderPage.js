import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as yup from "yup";

import { useNavigate } from 'react-router-dom'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack
} from '@chakra-ui/react';
import axios from 'axios';

const OrderFoods = () => {
    const { token_number, order_id, table_number, status } = JSON.parse(localStorage["food-order-values"])
    const navTo = useNavigate();
    const [loading, setLoading] = useState(false);
    const [credential, setCredential] = useState("");

    const fieldValidationSchema = yup.object({
        token_number: yup.string().required(),
        order_id: yup.boolean().required(),
        table_number: yup.number().required(),
        status: yup.string().required(),

    });
    const { handleChange, handleSubmit, errors, values } = useFormik({
        initialValues: {

            token_number: token_number,
            order_id: order_id,
            table_number: table_number,
            status: status,

        },
        validationSchema: fieldValidationSchema,
        onSubmit: async (foodInfo) => {
            try {
                // console.log(foodInfo)
                // setLoading(true)
                // foodInfo.veg = foodInfo.veg === "true" ? true : false;
                await axios
                    .get(
                        "https://new-project-0xul.onrender.com/order",
                        foodInfo
                    )
                    .then((res) => {
                        setLoading(false)
                        navTo("/")
                        console.log(res)
                    })

                    .catch((err) => {
                        setLoading(false);
                        console.log(err)
                    });
            } catch (error) {
                setLoading(false)
                console.log("Error", error);
            }
        },
    });
    return (
        <Flex
            className="text-dark"
            minH={"100vh"}
            align={"center"}
            justify={"center"}
        >
            <Stack
                textAlign={"center"}
                spacing={50}
                mx={"auto"}
                maxW={"lg"}
                py={20}
                px={20}
                rounded={"lg"}
            >
                <Box rounded={"lg"} border={"1px solid gray"} borderRadius={"15px"} boxShadow={"lg"} p={40}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"} textAlign={"center"}>
                            Edit Food
                        </Heading>
                    </Stack>
                    <Stack spacing={4}>


                        <FormControl id="food_name" isRequired>
                            <FormLabel>Token_Number</FormLabel>
                            <Input
                                type="text"
                                id="token_number"
                                onChange={handleChange}
                                borderColor={errors.token_number ? "red.500" : "gray"}
                                placeholder={errors.token_number ? "required" : "Enter token_number"}
                                value={values.token_number}
                            />
                        </FormControl>

                        <FormControl id="order_id" isRequired>
                            <FormLabel>Order_id</FormLabel>
                            <Input
                                type="number"
                                id="order_id"
                                p={2}
                                onChange={handleChange}
                                borderColor={errors.order_id ? "red.500" : "gray"}
                                placeholder={errors.order_id ? "required" : "Enter order_id"}
                                value={values.order_id}
                            />
                        </FormControl>
                        <FormControl id="table_number" isRequired>
                            <FormLabel>Table_Number</FormLabel>
                            <Input
                                type="text"
                                id="table_number"
                                multiple
                                p={2}
                                onChange={handleChange}
                                borderColor={errors.table_number ? "red.500" : "gray"}
                                placeholder={errors.table_number ? "required" : "Enter table_number"}
                                value={values.table_number}
                            />
                        </FormControl>
                        <FormControl id="status" isRequired>
                            <FormLabel>status</FormLabel>
                            <Input
                                type="text"
                                id="status"
                                multiple
                                p={2}
                                onChange={handleChange}
                                borderColor={errors.status ? "red.500" : "gray"}
                                placeholder={
                                    errors.status ? "required" : "Enter status"
                                }
                                value={values.status}
                            />
                        </FormControl>

                        <Box color={"red.300"}>{credential}</Box>
                        <Stack pt={2}>
                            {!loading && <Button
                                isLoading={true}
                                onClick={handleSubmit}
                                size="lg"
                                bg={"yellow"}
                                color={"dark"}
                            >
                                Order
                            </Button>}
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>

    );
};

export default OrderFoods;