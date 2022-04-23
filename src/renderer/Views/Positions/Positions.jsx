import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react'

const Positions = () => {

    const fakePositionsData = [
        {
            id: 1,
            titlle: 'USHAMART',
            tag1: 'NSE',
            tag2: 'CNC',
            duration: 'Long',
            count1: 20,
            price1: 71.7550,
            price2: 71.7550,
            change: 5.67,
        },
        {
            id: '2',
            titlle: 'RELIANCE',
            tag1: 'NSE',
            tag2: 'CNC',
            duration: 'Long',
            count1: 20,
            price1: 71.7550,
            price2: 71.7550,
            change: 5.67,
        },
        {
            id: 3,
            titlle: 'RELIANCE',
            tag1: 'NSE',
            tag2: 'CNC',
            duration: 'Short',
            count1: 20,
            price: 80,
            price2: 71.7550,
            change: -20,
        },
        {
            id: 4,
            titlle: 'USHAMART',
            tag1: 'NSE',
            tag2: 'CNC',
            duration: 'Short',
            count1: 30,
            price1: 50.7550,
            price2: 50.7550,
            change: 5.67,
        },
        {
            id: '5',
            titlle: 'USHAMART',
            tag1: 'NSE',
            tag2: 'CNC',
            duration: 'Long',
            count1: 20,
            price1: 71.7550,
            price2: 71.7550,
            change: 5.67,
        },
    ];

    const customStyle = {
        'display': 'flex',
        'justify-content': 'space-around',
        'align-items': 'center'
    }

    const [positions, setPositions] = useState(fakePositionsData);

    return (
        <div>
            <Heading as='h1' size='sm'>Positions</Heading>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {
                    positions && positions.map(singleData =>
                        <Box boxShadow={'0 7px 30px -10px rgba(150,170,180,0.5)'} bgColor={'cyan.100'} color={'black'} p='10px' w='80%' mt='10px' maxW='md' borderWidth='0px' borderRadius='lg' key={singleData.id}>
                            <div style={customStyle}>
                                <div style={customStyle}>
                                    <Text fontSize='sm'>{singleData.titlle}</Text>
                                    <Text fontSize='sm' ml='10px' >{singleData.tag1}</Text>
                                </div>
                                <div style={customStyle}>
                                    <Text fontSize='sm'>{singleData.tag2}</Text>
                                    <Text fontSize='sm'>{singleData.duration}</Text>
                                    <Text fontSize='sm'>{singleData.count1}</Text>
                                    <Text fontSize='sm'> at </Text>
                                    <Text fontSize='sm'>{singleData.price1}</Text>
                                </div>
                            </div>
                            <div style={customStyle}>
                                <Text fontSize='sm'>LTP: {singleData.price2}</Text>
                                <Text fontWeight='bold' fontSize='sm' color={singleData.change > 0 ? 'green.600' : 'red.300'} >{singleData.change}</Text>
                            </div>
                        </Box>
                    )
                }
            </div>
        </div>
    )
}

export default Positions;