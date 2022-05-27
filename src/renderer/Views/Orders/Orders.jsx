import React, { useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const Orders = () => {

    const fakeOrdersData = [
        {
            _id: '1',
            symbol: 'ABCD',
            side: 'Test side',
            orderDateTime: '10/05/2022',
            qty: '7',
            tradedPrice: '100',
            status: 'done',
        },
        {
            _id: '2',
            symbol: 'ABCD',
            side: 'Test side',
            orderDateTime: '10/05/2022',
            qty: '7',
            tradedPrice: '100',
            status: 'pending',
        },
        {
            _id: '3',
            symbol: 'ABCD',
            side: 'Test side',
            orderDateTime: '10/05/2022',
            qty: '7',
            tradedPrice: '100',
            status: 'done',
        },
        {
            _id: '4',
            symbol: 'ABCD',
            side: 'Test side',
            orderDateTime: '10/05/2022',
            qty: '7',
            tradedPrice: '100',
            status: 'pending',
        },
        {
            _id: '5',
            symbol: 'ABCD',
            side: 'Test side',
            orderDateTime: '10/05/2022',
            qty: '7',
            tradedPrice: '100',
            status: 'pending',
        },
        {
            _id: '6',
            symbol: 'ABCD',
            side: 'Test side',
            orderDateTime: '10/05/2022',
            qty: '7',
            tradedPrice: '100',
            status: 'done',
        },


    ];

    const customStyle = {
        'display': 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
    };

    const [orders, setOrders] = useState(fakeOrdersData);

    return (
        <div style={{ height: '-webkit-fill-available', overflow: 'auto' }}>
            <Heading pt='10px' pb='5px' as='h1' size='sm' fontFamily='poppins'>Orders</Heading>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {
                    orders && orders.map(singleData =>
                        <Box boxShadow={'0 7px 30px -10px rgba(150,170,180,0.5)'} bgColor={singleData.amount > 0 ? 'green.100' : 'red.50'} color={'black'} px='20px' py='15px' w='80%' mt='10px' maxW='md' borderWidth='0px' borderRadius='lg' key={singleData.id}
                            style={customStyle}
                        >
                            {/* <Text fontSize='sm'>{singleData.title}</Text>
                            <Text fontWeight='bold' color={singleData.amount > 0 ? 'green.600' : 'red.300'} fontSize='md'>{singleData.amount}</Text> */}
                            <div>
                                <div style={customStyle}>
                                    <Text fontSize='sm'>{singleData.symbol}</Text>
                                    <Text fontSize='sm' ml='10px' >{singleData.side}</Text>
                                </div>
                                <div style={customStyle}>
                                    <Text color='gray.500' fontSize='sm'>QTY: {singleData.qty}</Text>
                                    <Text color='gray.500' ml='2px' fontSize='sm'>at {singleData.tradedPrice}</Text>
                                    {/* <Text color='gray.500' ml='5px' fontSize='sm'>{singleData.count1}</Text>
                                    <Text color='gray.500' ml='5px' fontSize='sm'> at </Text>
                                    <Text color='gray.500' ml='5px' fontSize='sm'>{singleData.price1}</Text> */}
                                </div>
                            </div>
                            <div>
                                <Text fontSize='sm'>{singleData.orderDateTime}</Text>
                                <Text fontSize='sm'>{singleData.status}</Text>
                                {/* <Text fontWeight='bold' fontSize='sm' color={singleData.change > 0 ? 'green.600' : 'red.300'} >{singleData.change}</Text> */}
                            </div>
                        </Box>
                    )
                }
            </div>
        </div>
    )
}

export default Orders;