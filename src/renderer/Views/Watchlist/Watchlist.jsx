import React, { useState } from 'react';
import { Input, Button, Heading } from '@chakra-ui/react';

const Watchlist = () => {

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

    const [watclistData, setWatchlistData] = useState([]);
    const [savedTrade, setSavedTrade] = useState([]);

    const handleSearch = (e) => {
        let value = e.target.value.toLowerCase();
        let result = [];
        result = fakeWatchListData.filter((data) => {
            //console.log(data.name.toLowerCase().search(value) != -1);
            return data.name.toLowerCase().search(value) != -1;
        });
        console.log('result', result);
        if (value.length !== 0) {
            setWatchlistData(result);
        }
        else {
            setWatchlistData([]);
        }
        //console.log("Watchlist Data", watclistData);
        //console.log(e.target.value);
    }

    const handleAddBtn = (data) => {
        setSavedTrade([...savedTrade, data]);
    }

    const handleDeleteBtn = (id) => {
        const updatedSavedTrade = savedTrade.filter((item => item.id !== id));
        setSavedTrade(updatedSavedTrade);
    }

    return (
        <div>
            <Heading as='h2' size='xl' style={{ backgroundColor: 'yellow', boxShadow: '5px 5px 5px grey' }}>Watchlist</Heading>
            <Input type="text" variant='filled' placeholder='Search Bar' name="watchlist-search" id="watchlist-search" onChange={(e) => handleSearch(e)} />
            {
                watclistData.length !== 0 ?

                    watclistData.map(singleData =>
                        <div key={singleData.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px', marginTop: '5px', margin: '5px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginRight: '5px' }}>
                                <p>{singleData.name}</p>
                                <p>{singleData.price}</p>
                            </div>
                            <div>
                                <Button>B</Button>
                                <Button>S</Button>
                                <Button>{'->'}</Button>
                                <Button>=</Button>
                                <Button colorScheme='blue' onClick={() => handleAddBtn(singleData)}>+</Button>
                            </div>
                        </div>
                    )
                    :
                    <div>
                        <h5>Empty</h5>
                    </div>
            }
            <div style={{ marginTop: '5px' }}>

                {
                    savedTrade.length !== 0 ?

                        savedTrade && savedTrade.map(singleData =>
                            <div key={singleData.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px', marginTop: '5px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', marginRight: '5px' }}>
                                    <p>{singleData.tag}</p>
                                    <p>{singleData.percentage}</p>
                                </div>
                                <div>
                                    <Button>B</Button>
                                    <Button>S</Button>
                                    <Button>{'->'}</Button>
                                    <Button>=</Button>
                                    <Button colorScheme='pink' variant='solid' onClick={() => handleDeleteBtn(singleData.id)}>-</Button>
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