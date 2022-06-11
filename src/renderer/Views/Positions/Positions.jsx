import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatClockIcon, RepeatIcon } from '@chakra-ui/icons';
import {
    Box, Heading, Text, Grid, GridItem, Menu, MenuButton, MenuList, MenuIcon, IconButton, MenuItem, useToast, useDisclosure, AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Positions = ({ modifyOrder, setModifyOrder, positions, setPositions, id, setId }) => {

    const customStyle = {
        'display': 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
    }

    //const [positions, setPositions] = useState(fakePositionsData);

    const [pos, setPos] = useState([]);
    //console.log('INSIDE SET TOTAL USE EFFECT: ', pos ? pos : '');
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    useEffect(() => {
        const newTotal = positions ? positions : [];
        setPos(newTotal);
        //console.log('INSIDE SET TOTAL USE EFFECT: ', newTotal);
    }, [positions]);

    const handleExitTrade = (singleId) => {

        onOpen()
        console.log(isOpen, cancelRef, "IDDD: ", singleId);

        const url = 'http://localhost:8080/exit-order';

        const reqBodyExit = {

            "id": singleId

        }

        axios.post(url, reqBodyExit).then((res) => {
            console.log(res.data);
            const message = res.data.success.message;
            toast({
                title: res.data.success.code !== 200 ? 'info' : 'success',
                description: res.data.success.message,
                status: res.data.success.code !== 200 ? 'info' : 'success',
                duration: 2000,
                isClosable: true,
            })
        }).catch((e) => {
            console.log(e);
            toast({
                title: 'Unexpected Error',
                description: 'Something Went Wrong!',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        })
    }

    const handleModifyTrade = (singleId) => {
        setModifyOrder(modifyOrder === false ? true : modifyOrder);
        setId(singleId);
    }


    return (
        <div style={{ height: '-webkit-fill-available', overflow: 'auto', fontFamily: 'poppins' }}>
            <Heading pt='10px' pb='5px' as='h1' size='sm' fontFamily='poppins'>Positions</Heading>

            <Grid templateColumns='repeat(10, 1fr)' gap={6} maxWidth='100%' marginTop='5vh' margin='2vh' padding='0vh 5vh 0vh 5vh' textAlign='left' >
                <GridItem w='15vh' h='10'>
                    <Text color='gray.500' fontSize='sm'>Symbol: </Text>
                </GridItem>

                <GridItem w='100%' h='10'>
                    <Text color='gray.500' fontSize='sm'>Product Type: </Text>
                </GridItem>

                <GridItem w='100%' h='10'>
                    <Text color='gray.500' fontSize='sm'>Up: </Text>
                </GridItem>

                <GridItem w='100%' h='10'>
                    <Text color='gray.500' fontSize='sm'>BUY/SELL: </Text>
                </GridItem>

                <GridItem w='100%' h='10'>
                    <Text color='gray.500' fontSize='sm'>Buy Qty: </Text>
                </GridItem>

                <GridItem w='100%' h='10'>
                    <Text color='gray.500' fontSize='sm'>Sell Qty: </Text>
                </GridItem>

                <GridItem w='100%' h='10'>
                    <Text color='gray.500' fontSize='sm'>Avg Price: </Text>
                </GridItem>

                <GridItem w='100%' h='10'>
                    <Text color='gray.500' fontSize='sm'>LTP: </Text>
                </GridItem>
                <GridItem w='100%' h='10'>
                    <Text color='gray.500' fontSize='sm'>Profit/Loss: </Text>
                </GridItem>

                <GridItem w='100%' h='10' textAlign='center'>
                    <Text color='gray.500' fontSize='sm'>Edit/Exit </Text>
                </GridItem>

                {/* <Text color='gray.500' fontSize='sm'>Symbol: </Text> */}

            </Grid>

            {
                positions && positions.map(singleData => (

                    singleData.buyQty !== singleData.sellQty &&

                    <Grid templateColumns='repeat(10, 1fr)' gap={6} margin='2vh' maxWidth='100%' paddingLeft='5vh' paddingRight='5vh' paddingTop='2vh' textAlign='left' className='boxShadow' borderRadius='12px'>
                        <GridItem w='15vh' h='10'>
                            <Text color='gray.500' fontSize='sm'>{singleData.symbol}</Text>
                        </GridItem>

                        <GridItem w='100%' h='10'>
                            <Text color='gray.500' fontSize='sm'>{singleData.productType} </Text>
                        </GridItem>

                        <GridItem w='100%' h='10'>
                            <Text color='gray.500' fontSize='sm'>{singleData.unrealized_profit} </Text>
                        </GridItem>

                        <GridItem w='100%' h='10'>
                            <Text color={singleData.side == 1 ? 'green.400' : 'red.300'} fontSize='sm'>{singleData.side == 1 ? 'BUY' : 'SELL'}</Text>
                        </GridItem>

                        <GridItem w='100%' h='10'>
                            <Text color='gray.500' fontSize='sm'>{singleData.buyQty}</Text>
                        </GridItem>

                        <GridItem w='100%' h='10'>
                            <Text color='gray.500' fontSize='sm'>{singleData.sellQty}</Text>
                        </GridItem>

                        <GridItem w='100%' h='10'>
                            <Text color='gray.500' fontSize='sm'>{singleData.avgPrice}</Text>
                        </GridItem>

                        <GridItem w='100%' h='10'>
                            <Text color='gray.500' fontSize='sm'>{singleData.ltp}</Text>
                        </GridItem>
                        <GridItem w='100%' h='10'>
                            <Text fontWeight='bold' fontSize='sm' color={singleData.pl > 0 ? 'green.600' : 'red.300'} >{singleData.pl}</Text>
                        </GridItem>

                        <GridItem w='100%' h='12' textAlign='center'>
                            <Menu >
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<HamburgerIcon />}
                                    variant='outline'
                                    size='sm'
                                />
                                <MenuList>
                                    <MenuItem icon={<RepeatIcon />} command='⌘⇧N' onClick={() => handleModifyTrade(singleData.id)} >
                                        Modify Trade
                                    </MenuItem>
                                    <MenuItem icon={<EditIcon />} command='⌘O' onClick={onOpen} >
                                        Exit Trade
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </GridItem>

                        {/* <Text color='gray.500' fontSize='sm'>Symbol: </Text> */}
                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                        Exit Trade
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        Are you sure? You can't undo this action afterwards.
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={onClose}>
                                            Cancel
                                        </Button>
                                        <Button colorScheme='red' onClick={() => { handleExitTrade(singleData.id); onClose() }} ml={3}>
                                            Confirm
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>

                    </Grid>
                )
                )
            }
        </div>
    )
}

export default Positions;