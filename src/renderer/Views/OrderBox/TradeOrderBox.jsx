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
    Input,
    Select,
    useToast
} from '@chakra-ui/react';
import { CloseIcon, InfoOutlineIcon, SmallCloseIcon } from '@chakra-ui/icons';
import axios from 'axios';

const TradeOrderBox = ({ side, setSide, modifyOrder, setModifyOrder, id, setId, symbol, setSymbol }) => {

    // const [buyTrue, setBuyTrue] = useState(false);

    //const finalRef = React.useRef();

    //console.log(isOpen, onOpen, onClose);


    //const [symbol, setSymbol] = useState("");
    const [productType, setProductType] = useState("");
    //const [type, setType] = useState("");
    //const [disclosedQty, setDisclosedQty] = useState("");
    //const [stopLoss, setStopLoss] = useState("");
    //const [stopPrice, setStopPrice] = useState("");
    const [type, setType] = useState("");
    //const [limitPrice, setLimitPrice] = useState("");
    const [validity, setValidity] = useState("");
    const [qty, setQty] = useState("");
    //const [triggerPrice, setTriggerPrice] = useState("");
    //const [takeProfit, setTakeProfit] = useState("");
    const [offlineOrder, setOfflineOrder] = useState(false);

    const toast = useToast();



    const handleBuySellChange = (e) => {
        console.log(e.target.checked);
        if (e.target.checked === false) {
            setBuyClicked({ status: false });
        }
        else {
            setBuyClicked({ status: true });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const reqBody = {
            "symbol": symbol,
            "qty": qty,
            "type": type,
            "side": side,
            "productType": productType,
            "limitPrice": 0,
            "stopPrice": 0,
            "validity": validity,
            "disclosedQty": 0,
            "offlineOrder": offlineOrder,
            "stopLoss": 0,
            "takeProfit": 0
        };

        const reqBodyModify = {
            "id": id,
            "qty": qty,
            "type": type,
            "side": side,
            "limitPrice": 0,
            "stopPrice": 0,
            "offlineOrder": offlineOrder
        }

        console.log(reqBodyModify);

        if (modifyOrder === false) {
            const url = 'http://localhost:8091/place-order'

            axios.post(url, reqBody).then((res) => {
                console.log(res.data);
                const message = res.data.success.message;
                toast({
                    title: 'Success',
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
        if (modifyOrder === true) {
            const url2 = 'http://localhost:8091/modify-order'

            axios.post(url2, reqBodyModify).then((res) => {
                console.log(res.data.success.msg);
                toast({
                    title: 'Success',
                    description: res.data.success.message,
                    status: res.data.success.code !== 200 ? 'info' : 'success',
                    duration: 2000,
                    isClosable: true,
                })
            }).catch((e) => {
                console.log(e);
                toast({
                    title: 'Unexpected Error',
                    description: 'Something Went Wrong',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            })
        }

    }

    const handleCancel = () => {
        //setBuyClicked('');
        //setDisclosedQty('');
        //setLimitPrice('');
        setProductType('');
        setQty('');
        //setStopLoss('');
        //setStopPrice('');
        setSymbol('');
        //setTakeProfit('');
        //setTriggerPrice('');
        setType('');
        setValidity('');
        //setStopLoss('');
        setId('');
        setModifyOrder(false);
        setSide(1);
    }

    const parse = (val) => val.replace(/^\$/, '');

    return (
        <Box size='xl' width='100%' height='100%' className='boxShadow' overflow='auto'>

            <form onSubmit={(e) => handleSubmit(e)}>

                {/* <ModalOverlay /> */}
                <Box >
                    <Box bg={side === 1 ? 'blue.300' : 'orange.300'} color='white' padding='15px' borderRadius='10px'>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '.5rem' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Heading as='h3' size='sm' mr='.5rem'>{side === 1 ? 'Buy' : 'Sell'}</Heading>
                                    <Heading as='h3' size='sm' ml='15px' mr='15px'>{symbol ? symbol : " "}</Heading>
                                    {/* <Text fontSize='xs' ml='5px' textAlign='start' >NSE</Text> */}
                                    {/* <CloseIcon /> */}
                                    <SmallCloseIcon mr='.5rem' />
                                    <Heading as='h3' size='sm'>QTY: {qty}</Heading>
                                </div>
                                {/* <div style={{ display: 'flex' }}>
                                    <Text fontSize='sm' >BSE : 230</Text>
                                    <Text fontSize='sm' ml='15px'>NSE : 230</Text>
                                </div> */}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', marginRight: '25px', justifyContent: 'center', alignItems: 'center' }}>
                                <Tooltip label='Toggle Buy / Sell' placement='right'>
                                    <div>
                                        <Switch isChecked={side === 1 ? true : false} onChange={() => setSide(side === 1 ? -1 : 1)} />
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
                        <SimpleGrid columns={{ sm: 3, md: 4 }} spacing='20px'>
                            <Box>
                                {/* <div style={{ display: 'flex', alignItems: 'center', }}>
                                    <Radio />
                                    <Text fontSize='md' ml='5px' > Intraday </Text>
                                    <Text fontSize='xs' ml='5px' textAlign='center'> MIS </Text>
                                </div> */}
                                {
                                    modifyOrder &&
                                    <Input isRequired placeholder='ID' mt='10px' mb='10px' size='md' name='ID' value={id}
                                        onChange={e => setId(e.target.value)} />
                                }
                                {
                                    !modifyOrder &&
                                    <Input isRequired placeholder='Symbol' mt='10px' mb='10px' size='md' name='symbol' value={symbol}
                                        onChange={e => setSymbol(e.target.value)} />
                                }

                                {
                                    !modifyOrder &&
                                    <Select isRequired placeholder='Product Type' mb='10px' size='md' value={productType}
                                        onChange={e => setProductType(e.target.value)}>
                                        <option value='CNC'>CNC</option>
                                        <option value='INTRADAY'>INTRADAY</option>
                                        <option value='MARGIN'> MARGIN</option>
                                        <option value='CO'> CO</option>
                                        <option value='BO'> BO</option>
                                    </Select>
                                }

                                {/* {
                                    !modifyOrder &&
                                    <NumberInput value={disclosedQty}
                                        onChange={e => setDisclosedQty(e)} isRequired mt='10px' mb='10px' size='md'  >
                                        <NumberInputField placeholder='Disclosed QTY' />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                } */}


                            </Box>
                            <Box>
                                {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Radio />
                                    <Text fontSize='md' ml='5px' > Longterm </Text>
                                    <Text fontSize='xs' ml='5px' textAlign='center'> CNC </Text>
                                </div> */}

                                {/* <NumberInput mt='10px' mb='10px' size='md'>
                                    <NumberInputField placeholder='Price' />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput> */}

                                {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Radio />
                                    <Text fontSize='md' ml='5px' > Market </Text>

                                    <Radio ml='10px' />
                                    <Text fontSize='md' ml='5px' > Limit </Text>
                                </div> 

                                CNC => For equity only
                                INTRADAY => Applicable for all segments.
                                MARGIN => Applicable only for derivatives
                                CO => Cover Order
                                BO => Bracket Order
                                
                                
                                */}


                                {/* {
                                    !modifyOrder &&
                                    <NumberInput isRequired value={takeProfit}
                                        onChange={e => setTakeProfit(e)} id='takeProfit' mt='10px' mb='10px' size='md' >
                                        <NumberInputField placeholder='Take Profit D(0)' />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                } */}

                                <Select value={type}
                                    onChange={e => setType(e.target.value)} isRequired placeholder='Type' mt='10px' mb='10px' size='md'>
                                    <option value='1'>Limit Order</option>
                                    <option value='2'>Market Order</option>
                                    <option value='3'> Stop Order (SL-M)</option>
                                    <option value='4'> Stoplimit Order (SL-L)</option>
                                </Select>

                                {
                                    !modifyOrder &&
                                    <Select value={validity}
                                        onChange={e => setValidity(e.target.value)} isRequired placeholder='Validity' mt='10px' mb='10px' size='md'>
                                        <option value='IOC'> Immediate or Cancel</option>
                                        <option value='DAY'>Valid till the end of the day</option>
                                    </Select>
                                }


                            </Box>
                            <Box>
                                {/* <div style={{ display: 'flex', alignItems: 'center', visibility: 'hidden' }}>
                                    <Radio />
                                    <Text fontSize='md' ml='5px' > Longterm </Text>
                                    <Text fontSize='xs' ml='5px' textAlign='center'> CNC </Text>
                                </div> */}

                                <NumberInput min="0" value={qty}
                                    onChange={e => setQty(e)} isRequired mt='10px' mb='10px' size='md'>

                                    <NumberInputField placeholder='Qty(Quantity)' />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>

                                {
                                    /* <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Radio />
                                        <Text fontSize='md' ml='5px' > SL </Text>
    
                                        <Radio ml='10px' />
                                        <Text fontSize='md' ml='5px' > SL-M </Text>
                                    </div> */
                                }
                                {/* <NumberInput value={limitPrice}
                                    onChange={e => setLimitPrice(e)} isRequired mt='10px' mb='10px' size='md'>
                                    <NumberInputField placeholder='Limit Price' />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput> */}

                                {/* {
                                    !modifyOrder &&
                                    <NumberInput value={stopLoss} onChange={e => setStopLoss(e)} isRequired id='stopLoss' mt='10px' mb='10px' size='md'>
                                        <NumberInputField
                                            placeholder='Stop Loss' />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                } */}


                            </Box>
                            <Box>
                                {/* <div style={{ display: 'flex', alignItems: 'center', visibility: 'hidden' }}>
                                    <Radio />
                                    <Text fontSize='md' ml='5px' > Longterm </Text>
                                    <Text fontSize='xs' ml='5px' textAlign='center'> CNC </Text>
                                </div> */}
                                {/* <NumberInput value={triggerPrice}
                                    onChange={e => setTriggerPrice(e.target.value)} isRequired mt='10px' mb='10px' size='md'>
                                    <NumberInputField placeholder='Trigger Price' />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput> */}

                                {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Radio />
                                    <Text fontSize='md' ml='5px' > SL </Text>

                                    <Radio ml='10px' />
                                    <Text fontSize='md' ml='5px' > SL-M </Text>
                                </div> */}


                                {/* <NumberInput value={stopPrice}
                                    onChange={e => setStopPrice(e)} isRequired id='stopPrice' mt='10px' mb='10px' size='md'>
                                    <NumberInputField placeholder='Stop Price' />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput> */}


                                <Select value={offlineOrder}
                                    onChange={e => setOfflineOrder(e.target.value)} isRequired placeholder='Offline Order' mt='10px' mb='10px' size='md'>
                                    <option value='False'> False </option>
                                    <option value='True'> True </option>
                                </Select>
                            </Box>
                        </SimpleGrid>
                    </Box>

                    <Box display='flex' justifyContent='space-between' mt='2%' padding='15px' borderRadius='15px'>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Margin Required</Text>
                            <InfoOutlineIcon size='sm' ml='5px' />
                            <Text ml='5px'>$461.90</Text>
                            <Text ml='2px' fontSize='sm' >(5x)</Text>
                        </div>
                        <div>
                            {
                                modifyOrder ?
                                    <Button type='submit' colorScheme={'orange'} mr={3} >
                                        Modify
                                    </Button>
                                    :
                                    <Button type='submit' colorScheme={side === 1 ? 'blue' : 'orange'} mr={3} >
                                        {side === 1 ? 'Buy' : 'Sell'}
                                    </Button>
                            }
                            <Button variant='ghost' onClick={() => handleCancel()}>Cancel</Button>
                        </div>
                    </Box>
                </Box>

            </form>
        </Box>
    )
}

export default TradeOrderBox;