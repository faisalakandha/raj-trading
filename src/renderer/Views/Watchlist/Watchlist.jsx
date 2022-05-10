import React, { useEffect, useState } from 'react';
import { Input, Button, Heading, Stack, Tooltip, useDisclosure, Box, ScaleFade, Text, Spinner, Center, useToast } from '@chakra-ui/react';
import TradeOrderBox from '../OrderBox/TradeOrderBox';
import axios from 'axios';

const Watchlist = () => {
    const [rawWatclistData, setRawWatchlistData] = useState([]);
    const [watclistData, setWatchlistData] = useState([]);
    const [savedTrade, setSavedTrade] = useState([]);
    const [multiSavedTrade, setMultiSavedTrade] = useState([]);
    const [isShown, setIsShown] = useState(null);
    const [isShown2, setIsShown2] = useState(null);
    const [notFocused, setNotFocused] = useState({ display: 'none' });
    const [buyClicked, setBuyClicked] = useState({
        status: false,
        data: []
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);

    const toast = useToast();


    const fakeWatchListData = [
        // {
        //     id: '1',
        //     name: 'Sample1',
        //     tag: 'sq',
        //     price: '20',
        //     percentage: '10',
        // },

        {
            "_id": "626ce9114c3c339be75f907e",
            "scode": 539437,
            "name": "IDFC FIRST BANK LIMITED",
            "acode": "IDBL"
        },
        {
            "_id": "626ce9114c3c339be75f907b",
            "scode": 539957,
            "name": "Mahanagar Gas Limited",
            "acode": "MNGL"
        },
        {
            "_id": "626ce9114c3c339be75f907c",
            "scode": 540065,
            "name": "RBL Bank Limited",
            "acode": "RBLB"
        },
        {
            "_id": "626ce9114c3c339be75f9082",
            "scode": 535789,
            "name": "INDIABULLS HOUSING FINANCE LIMITED",
            "acode": "IBHF"
        },
        {
            "_id": "626ce9114c3c339be75f9083",
            "scode": 507685,
            "name": "WIPRO LTD.",
            "acode": "WIPR"
        },
        {
            "_id": "626ce9114c3c339be75f9088",
            "scode": 500300,
            "name": "GRASIM INDUS",
            "acode": "GRSM"
        },
    ];

    useEffect(() => {
        axios.get('http://localhost:8080/api/get-instruments')
            .then(function (response) {
                console.log(response.data);
                setRawWatchlistData(response.data);
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }, [])

    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i]._id === obj._id) {
                return true;
            }
        }

        return false;
    }

    const mergeArrayOfObjects = (original, newdata, selector = '_id') => {
        newdata.forEach(dat => {
            const foundIndex = original.findIndex(ori => ori[selector] == dat[selector]);
            if (foundIndex >= 0) original.splice(foundIndex, 1, dat);
            else original.push(dat);
        });

        return original;
    };

    const handleWatchlistClick = (e) => {
        console.log(e);
        console.log(e.currentTarget);
        console.log(e.target.localName);
        console.log(e.target.id);
        if (e.target.localName === "div" && e.target.id === 'mainDiv') {
            setNotFocused({ display: 'block' });
            const result = mergeArrayOfObjects(savedTrade, multiSavedTrade, '_id');
            console.log(result);
            if (result !== 0) {
                setSavedTrade(result);
            }
            setWatchlistData([]);
            console.log(savedTrade);
        }
    }

    const handleAddBtn = (data) => {

        console.log(savedTrade);

        const result = mergeArrayOfObjects(savedTrade, multiSavedTrade, '_id');

        if (!containsObject(data, result)) {
            //console.log(savedTrade.includes(data));
            console.log('My Bug: ', savedTrade);
            setSavedTrade([...result, data]);
            //console.log(data);
            //console.log(savedTrade);
            toast({
                title: 'Trade Added To Watchlist',
                description: "Success",
                status: 'success',
                duration: 1500,
                isClosable: true,
            })
            setWatchlistData([]);
            setNotFocused({ display: 'block' });
        }
        else {
            toast({
                title: 'Trade Already Exists',
                description: "Information",
                status: 'info',
                duration: 1500,
                isClosable: true,
            })
        }
    }

    const handleMultipleAddBtn = (data) => {
        setNotFocused({ display: 'none' });
        if (!containsObject(data, multiSavedTrade)) {
            setMultiSavedTrade([...multiSavedTrade, data]);
            toast({
                title: 'Trade Added To Watchlist',
                description: "Success",
                status: 'success',
                duration: 1500,
                isClosable: true,
            })
        }
        else {
            toast({
                title: 'Trade Already Exists',
                description: "Information",
                status: 'info',
                duration: 1500,
                isClosable: true,
            })
        }
    }

    const handleDeleteBtn = (id) => {
        const updatedSavedTrade = savedTrade.filter((item => item._id !== id));
        const updatedMultiSavedTrade = multiSavedTrade.filter((item => item._id !== id))
        setSavedTrade(updatedSavedTrade);
        setMultiSavedTrade(updatedMultiSavedTrade);
        toast({
            title: 'Trade Deleted From Watchlist',
            description: "Deleted",
            status: 'error',
            duration: 1500,
            isClosable: true,
        })
    }

    // const handleWatchlistBlur = () => {
    //     //setNotFocused({ display: 'block' });
    //     const result = mergeArrayOfObjects(savedTrade, multiSavedTrade, 'id');
    //     console.log(result);
    //     if (result !== 0) {
    //         setSavedTrade(result);
    //     }
    //     //setWatchlistData([]);
    // }

    const handleSearch = (e) => {
        let value = '';
        if (e.target.value.length < 3) {
            setWatchlistData([]);
            return;
        }
        // value = (typeof (e.target.value.toLowerCase()) !== undefined) ? value : '';

        var regex = new RegExp("^[a-zA-Z0-9 ]+$");
        if (regex.test(value.toLowerCase() === true)) {
            value = e.target.value.toLowerCase();
        }

        console.log(value);
        let result = [];
        result = rawWatclistData.filter((data) => {
            //console.log(data.name.toLowerCase().search(value) != -1);
            return data.acode.toLowerCase().indexOf(value) != -1;
        });
        if (result.length === 0) {
            result = rawWatclistData.filter((data) => {
                //console.log(data.name.toLowerCase().search(value) != -1);
                return data.name.toLowerCase().indexOf(value) != -1;
            });
        }
        console.log('result', result);
        if (value.length !== 0) {
            setWatchlistData(result);
        }
        else {
            setWatchlistData([]);
        }

        console.log(savedTrade);
        //console.log("Watchlist Data", watclistData);
        //console.log(e.target.value);
    }

    const handleBuySellClicked = (singleData, flag) => {
        if (flag === 'B') {
            setBuyClicked({ status: true, data: singleData });
        }
        if (flag === 'S') {
            setBuyClicked({ status: false, data: singleData });
        }
        onOpen();
    }

    return (
        <div style={{ height: '-webkit-fill-available', overflow: 'auto' }} >
            <Heading pt='10px' pb='15px' as='h1' size='sm' fontFamily='poppins'>Watchlist</Heading>
            <Tooltip label='Search Trades' placement='right'>
                <Input style={{ padding: '15px 10px', width: '90%' }} size='md' type="text" variant='filled' placeholder='Search Bar' name="watchlist-search" id="watchlist-search" onChange={(e) => handleSearch(e)} onFocus={() => setNotFocused({ display: 'none' })} />
            </Tooltip>
            {/* onBlur={() => handleWatchlistBlur()} */}
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', alignItems: 'center' }} >
                {
                    watclistData.length !== 0 ?

                        watclistData.map(singleData =>
                            <Box key={singleData._id} style={{ width: '98%', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', alignItems: 'center' }} className='watch-list-card'

                                p='10px' mt='10px' maxW='md' borderWidth='0px' borderRadius='lg'

                                onMouseEnter={() => setIsShown(singleData._id)}
                                onMouseLeave={() => setIsShown(null)}
                            >
                                <Tooltip label='Click To Add' placement='right'>
                                    <Box w='95%' style={{ display: 'flex', justifyContent: 'space-evenly', cursor: 'pointer' }}
                                        onClick={() => handleAddBtn(singleData)}
                                        bg='whiteAlpha.900'
                                        boxShadow={' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'}
                                        p='10px' mt='10px' mb='10px' borderWidth='0px' borderRadius='md'
                                    >
                                        <div style={{ marginRight: '10px', width: '55%', textAlign: 'left' }}>
                                            <Tooltip label='Name' placement='top'>
                                                <Text fontSize='sm' >{singleData.name}</Text>
                                            </Tooltip>
                                        </div>
                                        <div style={{ marginRight: '10px', width: '25%' }}>
                                            <Tooltip label='S-Code' placement='top'>
                                                <Text fontSize='sm' >{singleData.scode}</Text>
                                            </Tooltip>
                                        </div>
                                        <div style={{ width: '20%' }}>
                                            <Tooltip label='A-code' placement='top'>
                                                <Text fontSize='sm' >{singleData.acode}</Text>
                                            </Tooltip>
                                        </div>
                                    </Box>
                                </Tooltip>

                                {
                                    isShown === singleData._id && (
                                        <ScaleFade unmountOnExit={true} reverse initialScale={0.95} in={isShown}>
                                            <Stack spacing={1} direction={['column', 'row']} align='center' style={{ zIndex: '100' }}>
                                                <Button colorScheme='blue' size='sm' onClick={() => handleBuySellClicked(singleData, 'B')}>B</Button>
                                                <Button onClick={() => handleBuySellClicked(singleData, 'S')} bg='orange.300' color='white' size='sm' _hover={{ bg: 'orange.400' }}>S</Button>
                                                <Button size='sm'>{'->'}</Button>
                                                <Button size='sm'>=</Button>
                                                <Button size='sm' colorScheme='green'
                                                    onClick={() => handleMultipleAddBtn(singleData)}
                                                >+</Button>
                                            </Stack>
                                        </ScaleFade>
                                    )
                                }
                            </Box>
                        )
                        :
                        <div>
                            {
                                savedTrade.length === 0 &&
                                <Text color='gray.400' fontSize='xs'>Empty Watch List, Try Searching</Text>
                            }
                        </div>
                }
            </div>

            <TradeOrderBox buyClicked={buyClicked} setBuyClicked={setBuyClicked} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

            {

                notFocused.display === 'none' &&

                <Tooltip label='Click To View Saved Trades' placement='bottom'>
                    <div id={'mainDiv'} onClick={(e) => handleWatchlistClick(e)} style={{ height: '60%', cursor: 'pointer' }}>
                        {/* {
                            savedTrade.length === 0 &&
                            <Heading as='h6' size='sm'>No Trades Saved</Heading>
                        } */}
                    </div>
                </Tooltip>
            }
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '5px' }}>

                {

                }

                {
                    savedTrade.length !== 0 ?

                        savedTrade.map(singleData =>
                            <Box w='98%' key={singleData._id} style={notFocused} onMouseEnter={() => setIsShown2(singleData._id)}
                                onMouseLeave={() => setIsShown2(null)}

                            >
                                <Box style={{ width: '98%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}

                                    boxShadow={'0 7px 30px -10px rgba(150,170,180,0.5)'} bgColor={'blue.200'} color={'black'} p='10px' mt='10px' borderWidth='0px' borderRadius='lg'
                                >
                                    <Box style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', marginRight: '5px', cursor: 'default' }}
                                        bg='whiteAlpha.900'
                                        boxShadow={' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'}
                                        p='10px' mt='10px' mb='10px' borderWidth='0px' borderRadius='md'
                                    >
                                        {/* <p>{singleData.name}</p>
                                        <p>{singleData.percentage}</p> */}
                                        <div style={{ marginRight: '10px', width: '55%', textAlign: 'left' }}>
                                            <Tooltip label='Name' placement='top'>
                                                <Text fontSize='sm' >{singleData.name}</Text>
                                            </Tooltip>
                                        </div>
                                        <div style={{ marginRight: '10px', width: '25%' }}>
                                            <Tooltip label='S-Code' placement='top'>
                                                <Text fontSize='sm' >{singleData.scode}</Text>
                                            </Tooltip>
                                        </div>
                                        <div style={{ width: '20%' }}>
                                            <Tooltip label='A-code' placement='top'>
                                                <Text fontSize='sm' >{singleData.acode}</Text>
                                            </Tooltip>
                                        </div>
                                    </Box>
                                    {
                                        isShown2 === singleData._id &&
                                        <ScaleFade initialScale={0.9} in={isShown2}>
                                            <Stack spacing={1} direction={['column', 'row']} align='center'>
                                                <Button colorScheme='blue' size='sm' onClick={() => handleBuySellClicked(singleData, 'B')}>B</Button>
                                                <Button onClick={() => handleBuySellClicked(singleData, 'S')} bg='orange.300' color='white' size='sm' _hover={{ bg: 'orange.400' }}>S</Button>
                                                <Button size='sm'>{'->'}</Button>
                                                <Button size='sm'>=</Button>
                                                <Button size='sm' colorScheme='red' variant='solid' onClick={() => handleDeleteBtn(singleData._id)}>-</Button>
                                            </Stack>
                                        </ScaleFade>
                                    }

                                </Box>
                            </Box>
                        )
                        :
                        <div>
                            <h5></h5>
                        </div>
                }

            </div>
        </div>
    )
}

export default Watchlist;