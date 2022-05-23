import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Lorem,
    Button,
    Heading,
    Switch,
    Tabs, TabList, TabPanels, Tab, TabPanel, Text, SimpleGrid, Box, Radio, NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Tooltip,
} from '@chakra-ui/react';
import { CloseIcon, InfoOutlineIcon, SmallCloseIcon } from '@chakra-ui/icons';

const TradeOrderBox = ({ buyClicked, setBuyClicked, isOpen, onOpen, onClose }) => {

    // const [buyTrue, setBuyTrue] = useState(false);

    //const finalRef = React.useRef();

    //console.log(isOpen, onOpen, onClose);

    const handleBuySellChange = (e) => {
        console.log(e.target.checked);
        if (e.target.checked === false) {
            setBuyClicked({ status: false });
        }
        else {
            setBuyClicked({ status: true });
        }
    }

    return (
        <Box isOpen={isOpen} onClose={onClose} size='xl' width='100%' height='100%' className='boxShadow'>
            {/* <ModalOverlay /> */}
            <Box >
                <Box bg={buyClicked.status ? 'blue.300' : 'orange.300'} color='white' padding='15px' borderRadius='10px'>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Heading as='h3' size='sm'>{buyClicked.status ? 'Buy' : 'Sell'}</Heading>
                                <Heading as='h3' size='sm' ml='15px'>IEX</Heading>
                                <Text fontSize='xs' ml='5px' textAlign='start' >NSE</Text>
                                {/* <CloseIcon /> */}
                                <SmallCloseIcon />
                                <Heading as='h3' size='sm'>10 Qty</Heading>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Text fontSize='sm' >BSE : 230</Text>
                                <Text fontSize='sm' ml='15px'>NSE : 230</Text>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', marginRight: '25px', justifyContent: 'center', alignItems: 'center' }}>
                            <Tooltip label='Toggle Buy / Sell' placement='right'>
                                <div>
                                    <Switch isChecked={buyClicked.status} onChange={(e) => handleBuySellChange(e)} />
                                </div>
                            </Tooltip>
                            <InfoOutlineIcon style={{ marginLeft: '10px', marginTop: '5px' }} />
                        </div>
                    </div>
                    {/* <div>
                            <Tabs size='sm' mt='5px'>
                                <TabList>
                                    <Tab>Regular</Tab>
                                    <Tab>Cover</Tab>
                                    <Tab>AMO</Tab>
                                    <Tab>Iceberg</Tab>
                                </TabList>

                                <TabPanels>
                                </TabPanels>
                            </Tabs>
                        </div> */}
                </Box>
                {/* <ModalCloseButton /> */}
                <Box padding='15px' >
                    <SimpleGrid columns={[2, null, 3]} spacing='40px'>
                        <Box>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                                <Radio />
                                <Text fontSize='md' ml='5px' > Intraday </Text>
                                <Text fontSize='xs' ml='5px' textAlign='center'> MIS </Text>
                            </div>

                            <NumberInput mt='10px' mb='10px' size='md'>
                                <NumberInputField placeholder='Qty' />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>

                        </Box>
                        <Box>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Radio />
                                <Text fontSize='md' ml='5px' > Longterm </Text>
                                <Text fontSize='xs' ml='5px' textAlign='center'> CNC </Text>
                            </div>

                            <NumberInput mt='10px' mb='10px' size='md'>
                                <NumberInputField placeholder='Price' />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Radio />
                                <Text fontSize='md' ml='5px' > Market </Text>

                                <Radio ml='10px' />
                                <Text fontSize='md' ml='5px' > Limit </Text>
                            </div>

                        </Box>
                        <Box>
                            <div style={{ display: 'flex', alignItems: 'center', visibility: 'hidden' }}>
                                <Radio />
                                <Text fontSize='md' ml='5px' > Longterm </Text>
                                <Text fontSize='xs' ml='5px' textAlign='center'> CNC </Text>
                            </div>
                            <NumberInput mt='10px' mb='10px' size='md'>
                                <NumberInputField placeholder='Trigger Price' />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Radio />
                                <Text fontSize='md' ml='5px' > SL </Text>

                                <Radio ml='10px' />
                                <Text fontSize='md' ml='5px' > SL-M </Text>
                            </div>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box display='flex' justifyContent='space-between' mt='5%' padding='15px' borderRadius='15px'>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Margin Required</Text>
                        <InfoOutlineIcon size='sm' ml='5px' />
                        <Text ml='5px'>$461.90</Text>
                        <Text ml='2px' fontSize='sm' >(5x)</Text>
                    </div>
                    <div>
                        <Button colorScheme={buyClicked.status ? 'blue' : 'orange'} mr={3} >
                            {buyClicked.status ? 'Buy' : 'Sell'}
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </div>
                </Box>
            </Box>
        </Box>
    )
}

export default TradeOrderBox;