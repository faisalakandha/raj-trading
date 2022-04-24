import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const PAndL = () => {

    const fakeProfitAndLossData = [
        {
            id: 1,
            title: 'Example1',
            amount: 50,
        },
        {
            id: 2,
            title: 'Example1',
            amount: -15,
        },
        {
            id: 3,
            title: 'Example1',
            amount: 90,
        },
        {
            id: 4,
            title: 'Example1',
            amount: 50,
        },
        {
            id: 5,
            title: 'Example1',
            amount: 10,
        },
        {
            id: 6,
            title: 'Example1',
            amount: -5,
        },
        {
            id: 7,
            title: 'Example1',
            amount: 120,
        },
        {
            id: 8,
            title: 'Example1',
            amount: -50,
        },
    ];

    const customStyle = {
        'display': 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
    };


    const [profitAndLoss, setProfitAndLoss] = useState(fakeProfitAndLossData);

    return (
        <div style={{ height: '-webkit-fill-available', overflow: 'auto' }}>
            <Heading as='h1' size='sm'>P & L</Heading>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {
                    profitAndLoss && profitAndLoss.map(singleData =>
                        <Box boxShadow={'0 7px 30px -10px rgba(150,170,180,0.5)'} bgColor={singleData.amount > 0 ? 'green.100' : 'red.50'} color={'black'} px='20px' py='15px' w='80%' mt='10px' maxW='md' borderWidth='0px' borderRadius='lg' key={singleData.id}
                            style={customStyle}
                        >
                            <Text fontSize='sm'>{singleData.title}</Text>
                            <Text fontWeight='bold' color={singleData.amount > 0 ? 'green.600' : 'red.300'} fontSize='md'>{singleData.amount}</Text>
                            {/* <div>
                                <div style={customStyle}>
                                    <Text fontSize='sm'>{singleData.titlle}</Text>
                                    <Text fontSize='sm' ml='10px' >{singleData.tag1}</Text>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text color='gray.500' fontSize='sm'>{singleData.tag2}</Text>
                                    <Text color='gray.500' ml='5px' fontSize='sm'>{singleData.duration}</Text>
                                    <Text color='gray.500' ml='5px' fontSize='sm'>{singleData.count1}</Text>
                                    <Text color='gray.500' ml='5px' fontSize='sm'> at </Text>
                                    <Text color='gray.500' ml='5px' fontSize='sm'>{singleData.price1}</Text>
                                </div>
                            </div>
                            <div>
                                <Text fontSize='sm'>LTP: {singleData.price2}</Text>
                                <Text fontWeight='bold' fontSize='sm' color={singleData.change > 0 ? 'green.600' : 'red.300'} >{singleData.change}</Text>
                            </div> */}
                        </Box>
                    )
                }
            </div>
        </div>
    )
}

export default PAndL;