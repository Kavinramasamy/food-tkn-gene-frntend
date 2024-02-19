import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Grid, GridItem, Heading, Image, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const FoodmenuPage = () => {
    const [data, setData] = useState([])
    const getData = async () => {

        try {
            await axios.get("https://new-project-0xul.onrender.com/food")
                .then((res) => { setData(res.data.food_list); console.log(res.data.food_list) })
                .catch((err) => (console.log(err)))
        }
        catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        getData()
    }, [])
    const navTo = useNavigate();
    const editFunction = (ele) => {
        localStorage["food-values"] = JSON.stringify(ele);
        navTo("/editfood")
    }
    const orderFunction = (ele) => {
        localStorage["food-order-values"] = JSON.stringify(ele);
        navTo("/orderfood")
    }
    return (
        <div>
            <Grid templateColumns='repeat(3, 1fr)' p={"10px"} gap={6} >
                {!data.length > 0 && <Heading>Loading...</Heading>}
                {data.length > 0 && data.map((ele, idx) => (
                    <GridItem w='100%' p={"10px"} bg='blue.500' border={"2px solid black"} borderRadius={"15px"}>
                        <Card maxW='sm'>
                            <CardBody>
                                <Image
                                    src={ele.image_url}
                                    alt='food'
                                    borderRadius='md'
                                />
                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>Food_Name:{ele.food_name}</Heading>
                                    <Text>

                                    </Text>
                                    <Text color='blue.600' fontSize='5xl'>
                                        Price: ₹ {ele.price}/-
                                    </Text>
                                    <Text color='blue.600' fontSize='5xl'>
                                        Cooking_time:{ele.cooking_time}
                                    </Text>
                                    <Text color='blue.600' fontSize='5xl'>
                                        Cuisine:{ele.cuisine}
                                    </Text>
                                    <Text color='blue.600' fontSize='5xl'>
                                        Dish:{ele.veg === true ? "Veg" : "Non-Veg"}
                                    </Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <ButtonGroup spacing='2'>
                                    <Button variant='solid' bg={"yellow"} onClick={() => orderFunction(ele)}>
                                        order now
                                    </Button>
                                    <Button variant='solid' bg={"green"} onClick={() => editFunction(ele)}>
                                        Edit
                                    </Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    </GridItem>
                ))}
            </Grid>
        </div>

    )
}

export default FoodmenuPage