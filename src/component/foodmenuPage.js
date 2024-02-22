import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FoodmenuPage = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      await axios
        .get("https://new-project-0xul.onrender.com/food")
        .then((res) => {
          setData(res.data.food_list);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const navTo = useNavigate();
  const editFunction = (ele) => {
    localStorage["food-values"] = JSON.stringify(ele);
    navTo("/editfood");
  };
  const orderFunction = (ele) => {
    localStorage["food-order-values"] = JSON.stringify(ele);
    navTo("/orderfood");
  };
  return (
    <Flex width={"100%"} justifyContent={"center"}>
      <Grid templateColumns="repeat(6, 1fr)" p={"10px"} gap={6}>
        {!data.length > 0 && <Heading>Loading...</Heading>}
        {data.length > 0 &&
          data.map((ele, idx) => (
            <GridItem
              key={idx}
              colSpan={{ base: 6, md: 3, lg: 2 }}
              p={"10px"}
              borderRadius={"15px"}
            >
              <Card maxW="sm">
                <CardBody
                  textAlign={"center"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Image
                    h={"30vh"}
                    src={ele.image_url}
                    alt="food"
                    borderRadius="md"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{ele.food_name}</Heading>
                    <Text></Text>
                    <Text
                      fontWeight={500}
                      color="blue.600"
                      fontSize={{ base: "md", md: "lg" }}
                    >
                      Price : ₹ {ele.price}/-
                    </Text>
                    <Text
                      fontWeight={500}
                      color="blue.600"
                      fontSize={{ base: "md", md: "lg" }}
                    >
                      Cooking Time : {ele.cooking_time}
                    </Text>
                    <Text
                      fontWeight={500}
                      color="blue.600"
                      fontSize={{ base: "md", md: "lg" }}
                    >
                      Cuisine : {ele.cuisine}
                    </Text>
                    <Text
                      fontWeight={500}
                      color="blue.600"
                      fontSize={{ base: "md", md: "lg" }}
                    >
                      Dish : {ele.veg === true ? "Veg" : "Non-Veg"}
                    </Text>
                  </Stack>
                </CardBody>
                <hr />
                <CardFooter>
                  <Flex w={"100%"} justifyContent={"space-evenly"}>
                    <Button
                      variant="solid"
                      bg={"pink"}
                      onClick={() => orderFunction(ele)}
                      w={"70%"}
                    >
                      order now
                    </Button>
                    {/* <Button
                      variant="solid"
                      bg={"cyan.400"}
                      onClick={() => editFunction(ele)}
                    >
                      Edit
                    </Button> */}
                  </Flex>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
      </Grid>
    </Flex>
  );
};

export default FoodmenuPage;
