import React, { useState } from 'react'

const Watchlist = () => {

    const fakeWatchListData = [
        {
            name: 'Sample1',
            tag: 'sq',
            price: '20',
            percentage: '10',
        },
        {
            name: 'Sample2',
            tag: 'ss',
            price: '30',
            percentage: '20',
        },
        {
            name: 'Sample3',
            tag: 's1s',
            price: '40',
            percentage: '15',
        },
        {
            name: 'Sample4',
            tag: 'pp',
            price: '50',
            percentage: '18',
        },
        {
            name: 'Sample5',
            tag: 'ra',
            price: '60',
            percentage: '40',
        },
    ];

    const [watclistData, setWatchlistData] = useState(fakeWatchListData);
    const [savedTrade, setSavedTrade] = useState([]);

    return (
        <div>
            <h3>Watchlist</h3>
            <input type="text" name="watchlist-search" id="watchlist-search" />
            {
                watclistData ?

                    watclistData.map(singleData => {
                        <div>
                            <div>
                                <p>{singleData.name}</p>
                                <p>{singleData.price}</p>
                            </div>
                            <div>
                                <button>B</button>
                                <button>S</button>
                                <button>{'->'}</button>
                                <button>=</button>
                                <button>+</button>
                            </div>
                        </div>
                    })
                    :
                    <div>
                        <h5>Empty</h5>
                    </div>
            }
        </div>
    )
}

export default Watchlist;