import React, { useState } from 'react'

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
            name: 'Sample2',
            tag: 'ss',
            price: '30',
            percentage: '20',
        },
        {
            id: '3',
            name: 'Sample3',
            tag: 's1s',
            price: '40',
            percentage: '15',
        },
        {
            id: '4',
            name: 'Sample4',
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
            return data.name.includes(value);
        });
        setWatchlistData(result);
        console.log(watclistData);
        console.log(e.target.value);
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
            <h3>Watchlist</h3>
            <input type="text" name="watchlist-search" id="watchlist-search" onChange={(e) => handleSearch(e)} />
            {
                watclistData.length !== 0 ?

                    watclistData.map(singleData =>
                        <div key={singleData.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginRight: '5px' }}>
                                <p>{singleData.name}</p>
                                <p>{singleData.price}</p>
                            </div>
                            <div>
                                <button>B</button>
                                <button>S</button>
                                <button>{'->'}</button>
                                <button>=</button>
                                <button onClick={() => handleAddBtn(singleData)}>+</button>
                            </div>
                        </div>
                    )
                    :
                    <div>
                        <h5>Empty</h5>
                    </div>
            }
            {
                savedTrade.length !== 0 ?

                    savedTrade && savedTrade.map(singleData =>
                        <div key={singleData.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginRight: '5px' }}>
                                <p>{singleData.tag}</p>
                                <p>{singleData.percentage}</p>
                            </div>
                            <div>
                                <button>B</button>
                                <button>S</button>
                                <button>{'->'}</button>
                                <button>=</button>
                                <button onClick={() => handleDeleteBtn(singleData.id)}>-</button>
                            </div>
                        </div>
                    )
                    :
                    <div>
                        <h5></h5>
                    </div>
            }
        </div>
    )
}

export default Watchlist;