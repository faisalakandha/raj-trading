import React, { useState } from 'react';
import { Input, Button, Heading, Stack, Tooltip, useDisclosure } from '@chakra-ui/react';
import TradeOrderBox from '../OrderBox/TradeOrderBox';

const Watchlist = () => {
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

    const fakeWatchListData = [
        {
            id: '1',
            name: 'Sample1',
            tag: 'sq',
            price: '20',
            percentage: '10',
        },
        {
            id: '2',
            name: 'Test2',
            tag: 'ss',
            price: '30',
            percentage: '20',
        },
        {
            id: '3',
            name: 'Beta3',
            tag: 's1s',
            price: '40',
            percentage: '15',
        },
        {
            id: '4',
            name: 'Alpha4',
            tag: 'pp',
            price: '50',
            percentage: '18',
        },
        {
            id: '5',
            name: 'Sample5',
            tag: 'ra',
            price: '60',
            percentage: '40',
        },
    ];

    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].id === obj.id) {
                return true;
            }
        }

        return false;
    }

    const mergeArrayOfObjects = (original, newdata, selector = 'id') => {
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
            const result = mergeArrayOfObjects(savedTrade, multiSavedTrade, 'id');
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
        if (!containsObject(data, savedTrade)) {
            //console.log(savedTrade.includes(data));
            setSavedTrade([...savedTrade, data]);
            //console.log(data);
            //console.log(savedTrade);
            setWatchlistData([]);
            setNotFocused({ display: 'block' });
        }
    }

    const handleMultipleAddBtn = (data) => {
        setNotFocused({ display: 'none' });
        if (!containsObject(data, multiSavedTrade)) {
            setMultiSavedTrade([...multiSavedTrade, data]);
        }
    }

    const handleDeleteBtn = (id) => {
        const updatedSavedTrade = savedTrade.filter((item => item.id !== id));
        const updatedMultiSavedTrade = multiSavedTrade.filter((item => item.id !== id))
        setSavedTrade(updatedSavedTrade);
        setMultiSavedTrade(updatedMultiSavedTrade);
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
        // value = (typeof (e.target.value.toLowerCase()) !== undefined) ? value : '';

        var regex = new RegExp("^[a-zA-Z0-9 ]+$");
        if (regex.test(value.toLowerCase() === true)) {
            value = e.target.value.toLowerCase();
        }

        console.log(value);
        let result = [];
        result = fakeWatchListData.filter((data) => {
            //console.log(data.name.toLowerCase().search(value) != -1);
            return data.name.toLowerCase().indexOf(value) != -1;
        });
        //console.log('result', result);
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
        <div style={{ height: '-webkit-fill-available' }} >
            <Heading as='h1' size='sm'>Watchlist</Heading>
            <Tooltip label='Search Trades' placement='right'>
                <Input style={{ padding: '15px 10px', width: '90%' }} size='md' type="text" variant='filled' placeholder='Search Bar' name="watchlist-search" id="watchlist-search" onChange={(e) => handleSearch(e)} onFocus={() => setNotFocused({ display: 'none' })} />
            </Tooltip>
            {/* onBlur={() => handleWatchlistBlur()} */}
            {
                watclistData.length !== 0 ?

                    watclistData.map(singleData =>
                        <div key={singleData.id} style={{ width: '99%', padding: '2px', marginTop: '5px', margin: '5px', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', alignItems: 'center', border: '1px solid #9171dc', borderRadius: '5px', backgroundColor: '#e8f3ff' }} onMouseEnter={() => setIsShown(singleData.id)}
                            onMouseLeave={() => setIsShown(null)}
                        >
                            <Tooltip label='Click To Add' placement='right'>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '5px', cursor: 'pointer' }}
                                    onClick={() => handleAddBtn(singleData)}
                                >
                                    <div style={{ marginRight: '5px' }}>{singleData.name}</div>
                                    <div style={{ marginRight: '5px' }}>{singleData.id}</div>
                                    <div>{singleData.price}</div>
                                </div>
                            </Tooltip>

                            {
                                isShown === singleData.id && (
                                    <Stack spacing={1} direction={['column', 'row']} align='center' style={{ zIndex: '100' }}>
                                        <Button colorScheme='blue' size='sm' onClick={() => handleBuySellClicked(singleData, 'B')}>B</Button>
                                        <Button onClick={() => handleBuySellClicked(singleData, 'S')} bg='orange.300' color='white' size='sm' _hover={{ bg: 'orange.400' }}>S</Button>
                                        <Button size='sm'>{'->'}</Button>
                                        <Button size='sm'>=</Button>
                                        <Button size='sm' colorScheme='green'
                                            onClick={() => handleMultipleAddBtn(singleData)}
                                        >+</Button>
                                    </Stack>
                                )
                            }
                        </div>
                    )
                    :
                    <div>
                        {
                            savedTrade.length === 0 &&
                            <h5>Empty Watch List, Try Searching</h5>
                        }
                    </div>
            }

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
            <div style={{ marginTop: '5px' }}>

                {
                    savedTrade.length !== 0 ?

                        savedTrade.map(singleData =>
                            <div key={singleData.id} style={notFocused} onMouseEnter={() => setIsShown2(singleData.id)}
                                onMouseLeave={() => setIsShown2(null)}>
                                <div style={{ width: '99%', padding: '2px', marginTop: '5px', margin: '5px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', border: '1px solid #9171dc', borderRadius: '5px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginRight: '5px' }}>
                                        <p>{singleData.tag}</p>
                                        <p>{singleData.percentage}</p>
                                    </div>
                                    {
                                        isShown2 === singleData.id &&
                                        <Stack spacing={1} direction={['column', 'row']} align='center'>
                                            <Button colorScheme='blue' size='sm' onClick={() => handleBuySellClicked(singleData, 'B')}>B</Button>
                                            <Button onClick={() => handleBuySellClicked(singleData, 'S')} bg='orange.300' color='white' size='sm' _hover={{ bg: 'orange.400' }}>S</Button>
                                            <Button size='sm'>{'->'}</Button>
                                            <Button size='sm'>=</Button>
                                            <Button size='sm' colorScheme='red' variant='solid' onClick={() => handleDeleteBtn(singleData.id)}>-</Button>
                                        </Stack>
                                    }

                                </div>
                            </div>
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