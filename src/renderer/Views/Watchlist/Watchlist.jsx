import React, { useEffect, useState } from 'react';
import { Input, Button, Heading, Stack, Tooltip, useDisclosure, Box, ScaleFade, Text, Spinner, Center, useToast } from '@chakra-ui/react';
import TradeOrderBox from '../OrderBox/TradeOrderBox';
import axios from 'axios';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

const Watchlist = ({ setSide, setSymbol }) => {
    const [rawWatclistData, setRawWatchlistData] = useState([]);
    const [watclistData, setWatchlistData] = useState([]);
    const [savedTrade, setSavedTrade] = useState([]);
    const [multiSavedTrade, setMultiSavedTrade] = useState([]);
    const [isShown, setIsShown] = useState(null);
    const [isShown2, setIsShown2] = useState(null);
    const [notFocused, setNotFocused] = useState({ display: 'block' });
    // const [buyClicked, setBuyClicked] = useState({
    //     status: false,
    //     data: []
    // });
    // const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    useEffect(() => {
        axios.get('http://localhost:8080/get-symbols-from-watchlist')
            .then(function (response) {
                console.log(response.data);
                setSavedTrade(response.data);
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
    }, [setSavedTrade, setWatchlistData])

    function containsObject(singleData, list) {
        let flag = false;
        let objSymbol = singleData[4] + ':' + singleData[1] + '-' + singleData[2];
        console.log("OBJ SYMBOL ", objSymbol);
        list.map((singleList) => {
            if (singleList.symbol === objSymbol) {
                console.log("Single Symbol ===== ", singleList.symbol === objSymbol);
                flag = true;
            }
        })
        return flag;
    }

    const mergeArrayOfObjects = (original, newdata, selector = '_id') => {
        newdata.forEach(dat => {
            const foundIndex = original.findIndex(ori => ori._id == dat._id);
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

            // const result = mergeArrayOfObjects(savedTrade, multiSavedTrade, '_id');
            // console.log(result);
            // if (result !== 0) {
            //     setSavedTrade(result);
            // }

            axios.get('http://localhost:8080/get-symbols-from-watchlist')
                .then(function (response) {
                    console.log(response.data);
                    setSavedTrade(response.data);
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

            setWatchlistData([]);
            console.log(savedTrade);

            setNotFocused({ display: 'block' });
        }
    }

    const handleAddBtn = (data) => {

        //console.log(savedTrade, multiSavedTrade);

        //const result = [...savedTrade, ...multiSavedTrade];

        //console.log("MERGED ARRAYS :::::   ", result);

        if (!containsObject(data, savedTrade)) {
            //console.log(savedTrade.includes(data));
            console.log('My Bug: ', savedTrade);
            //setSavedTrade([...result, data]);
            //console.log(data);
            //console.log(savedTrade);

            const url = 'http://localhost:8080/save-symbols-to-watchlist';

            const reqBodyExit = {
                symbol: data[4] + ':' + data[1] + '-' + data[2],
                code: data[3],
                ltp: data[10]
            }

            axios.post(url, reqBodyExit).then((res) => {
                console.log(res.data);
                //const message = res.data.success.message;
                toast({
                    title: 'Trade Added To Watchlist',
                    description: "Success",
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                })
            }).catch((e) => {
                console.log(e);
                toast({
                    title: 'Error Adding Trade To Database',
                    description: "Error",
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                })
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

        axios.get('http://localhost:8080/get-symbols-from-watchlist')
            .then(function (response) {
                console.log(response.data);
                setSavedTrade(response.data);
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
    }

    const handleMultipleAddBtn = (data) => {
        setNotFocused({ display: 'none' });
        console.log("CONTAINS OBJ +++ ", containsObject(data, savedTrade));
        if (!containsObject(data, savedTrade)) {

            const url = 'http://localhost:8080/save-symbols-to-watchlist';

            const reqBodyExit = {
                symbol: data[4] + ':' + data[1] + '-' + data[2],
                code: data[3],
                ltp: data[10]
            }

            axios.post(url, reqBodyExit).then((res) => {
                console.log(res.data);
                //const message = res.data.success.message;
                toast({
                    title: 'Trade Added To Watchlist',
                    description: "Success",
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                })
            }).catch((e) => {
                console.log(e);
                toast({
                    title: 'Error Adding Trade To Database',
                    description: "Error",
                    status: 'error',
                    duration: 1500,
                    isClosable: true,
                })
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
        axios.get('http://localhost:8080/get-symbols-from-watchlist')
            .then(function (response) {
                console.log(response.data);
                setSavedTrade(response.data);
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
    }

    const handleDeleteBtn = (id) => {
        const url = 'http://localhost:8080/remove-symbols-from-watchlist';

        const reqBodyExit = {
            id: id
        }

        axios.post(url, reqBodyExit).then((res) => {
            console.log(res.data);
            //const message = res.data.success.message;

            axios.get('http://localhost:8080/get-symbols-from-watchlist')
                .then(function (response) {
                    console.log(response.data);
                    setSavedTrade(response.data);
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

            toast({
                title: 'Trade Deleted',
                description: "Trade Deleted From Watchlist",
                status: 'error',
                duration: 1500,
                isClosable: true,
            })
        }).catch((e) => {
            console.log(e);
            toast({
                title: 'Error',
                description: "Error Deleting Trade",
                status: 'error',
                duration: 1500,
                isClosable: true,
            })
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

        // result = rawWatclistData.filter((data) => {
        //     //console.log(data.name.toLowerCase().search(value) != -1);
        //     return data.acode.toLowerCase().indexOf(value) != -1;
        // });
        // if (result.length === 0) {
        //     result = rawWatclistData.filter((data) => {
        //         //console.log(data.name.toLowerCase().search(value) != -1);
        //         return data.name.toLowerCase().indexOf(value) != -1;
        //     });
        // }



        console.log('result', result);
        if (value.length !== 0) {
            //setWatchlistData(result);

            axios.get(`http://localhost:8080/get-searched-symbols/${value}`)
                .then(function (response) {
                    //console.log(response);
                    if (response !== undefined) {
                        console.log("GET SEARCHED SYMBOLS  :::::   ", response.data.data.Records);
                        setRawWatchlistData(response.data.data.Records);
                        setWatchlistData(response.data.data.Records);
                    }
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

        }
        else {
            setWatchlistData([]);
        }

        console.log(savedTrade);
        //console.log("Watchlist Data", watclistData);
        //console.log(e.target.value);
    }

    const handleBuySellClicked = (singleData, flag) => {
        console.log(singleData);
        if (flag === 'B') {
            setSide(1);
            setSymbol(singleData[4] + ':' + singleData[1] + '-' + singleData[2]);
        }
        if (flag === 'S') {
            // setBuyClicked({ status: false, data: singleData });
            setSide(-1);
            setSymbol(singleData[4] + ':' + singleData[1] + '-' + singleData[2]);
        }
        if (flag === 'BS') {
            setSide(1);
            setSymbol(singleData.symbol);
        }
        if (flag === 'SS') {
            // setBuyClicked({ status: false, data: singleData });
            setSide(-1);
            setSymbol(singleData.symbol);
        }
        // onOpen();
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
                            <Box key={singleData[0]} style={{ width: '98%', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', alignItems: 'center' }} className='watch-list-card'

                                p='10px' mt='10px' maxW='md' borderWidth='0px' borderRadius='lg'

                                onMouseEnter={() => setIsShown(singleData[0])}
                                onMouseLeave={() => setIsShown(null)}
                            >
                                <Tooltip label='Click To Add' placement='right'>
                                    <Box w='100%' style={{ display: 'flex', justifyContent: 'space-evenly', cursor: 'pointer' }}
                                        onClick={() => handleAddBtn(singleData)}
                                        bg='whiteAlpha.900'
                                        boxShadow={' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'}
                                        p='10px' mt='10px' mb='10px' borderWidth='0px' borderRadius='md'
                                    >
                                        <div style={{ marginRight: '10px', width: '55%', textAlign: 'left' }}>
                                            <Tooltip label='Symbol' placement='top'>
                                                <Text fontSize='sm' >{singleData[4] + ':' + singleData[1] + '-' + singleData[2]}</Text>
                                            </Tooltip>
                                        </div>
                                        <div style={{ marginRight: '10px', width: '25%' }}>
                                            <Tooltip label='S-Code' placement='top'>
                                                <Text fontSize='sm' >{singleData[3]}</Text>
                                            </Tooltip>
                                        </div>
                                        <div style={{ width: '20%' }}>
                                            <Tooltip label='LTP' placement='top'>
                                                <Text fontSize='sm' >{singleData[10]}</Text>
                                            </Tooltip>
                                        </div>
                                    </Box>
                                </Tooltip>

                                {
                                    isShown === singleData[0] && (
                                        <ScaleFade unmountOnExit={true} reverse initialScale={0.95} in={isShown}>
                                            <Stack spacing={1} direction={['column', 'row']} align='center' style={{ zIndex: '100' }}>

                                                <Tooltip label='BUY' placement='top'>
                                                    <Button colorScheme='blue' size='sm' onClick={() => handleBuySellClicked(singleData, 'B')}>B</Button>
                                                </Tooltip>

                                                <Tooltip label='Sell' placement='top'>
                                                    <Button onClick={() => handleBuySellClicked(singleData, 'S')} bg='orange.300' color='white' size='sm' _hover={{ bg: 'orange.400' }}>S</Button>
                                                </Tooltip>

                                                {/* <Button size='sm'>{'->'}</Button>
                                                <Button size='sm'>=</Button> */}
                                                <Tooltip label='Save Trade' placement='top'>
                                                    <Button size='sm' colorScheme='green'
                                                        onClick={() => handleMultipleAddBtn(singleData)}
                                                    ><AddIcon /></Button>
                                                </Tooltip>
                                            </Stack>
                                        </ScaleFade>
                                    )
                                }
                            </Box>
                        )
                        :
                        <div >
                            {
                                savedTrade.length === 0 &&
                                <Text mt="3rem" color='gray.400' fontSize='xs'>Empty Watch List, Try Adding Trades</Text>
                            }
                        </div>
                }
            </div>

            {/* <TradeOrderBox buyClicked={buyClicked} setBuyClicked={setBuyClicked} isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> */}

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
                    savedTrade.length !== 0 ?

                        savedTrade.map(singleData =>
                            <Box w='88%' key={singleData._id} style={notFocused} onMouseEnter={() => setIsShown2(singleData._id)}
                                onMouseLeave={() => setIsShown2(null)}

                            >
                                <Box style={{ width: '98%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}

                                    boxShadow={'0 7px 30px -10px rgba(150,170,180,0.5)'} bgColor={'blue.200'} color={'black'} p='10px' mt='10px' borderWidth='0px' borderRadius='lg'
                                >
                                    <Tooltip label={singleData[8]} placement='right'>

                                        <Box style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', marginRight: '5px', cursor: 'default' }}
                                            bg='whiteAlpha.900'
                                            boxShadow={' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'}
                                            p='10px' mt='10px' mb='10px' borderWidth='0px' borderRadius='md'
                                        >
                                            {/* <p>{singleData.name}</p>
                                            <p>{singleData.percentage}</p> */}
                                            <div style={{ marginRight: '10px', width: '55%', textAlign: 'left' }}>
                                                <Tooltip label='Symbol' placement='top'>
                                                    <Text fontSize='sm' >{singleData.symbol}</Text>
                                                </Tooltip>
                                            </div>
                                            <div style={{ marginRight: '10px', width: '25%' }}>
                                                <Tooltip label='S-Code' placement='top'>
                                                    <Text fontSize='sm' >{singleData.code}</Text>
                                                </Tooltip>
                                            </div>
                                            <div style={{ width: '20%' }}>
                                                <Tooltip label='LTP' placement='top'>
                                                    <Text fontSize='sm' >{singleData.ltp}</Text>
                                                </Tooltip>
                                            </div>
                                        </Box>

                                    </Tooltip>
                                    {
                                        isShown2 === singleData._id &&
                                        <ScaleFade initialScale={0.9} in={isShown2}>
                                            <Stack spacing={1} direction={['column', 'row']} align='center'>
                                                <Tooltip label='BUY' placement='top'>
                                                    <Button colorScheme='blue' size='sm' onClick={() => handleBuySellClicked(singleData, 'BS')}>B</Button>
                                                </Tooltip>
                                                <Tooltip label='Sell' placement='top'>
                                                    <Button onClick={() => handleBuySellClicked(singleData, 'SS')} bg='orange.300' color='white' size='sm' _hover={{ bg: 'orange.400' }}>S</Button>
                                                </Tooltip>
                                                {/* <Button size='sm'>{'->'}</Button>
                                                <Button size='sm'>=</Button> */}
                                                <Tooltip label='Delete Trade' placement='top'>
                                                    <Button size='sm' colorScheme='red' variant='solid' onClick={() => handleDeleteBtn(singleData._id)}><DeleteIcon /></Button>
                                                </Tooltip>
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