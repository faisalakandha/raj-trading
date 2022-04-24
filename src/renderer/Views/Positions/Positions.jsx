import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react'

const Positions = () => {

    const fakePositionsData = [
        {
            id: 1,
            title: 'USHAMART',
            tag1: 'NSE',
            tag2: 'CNC',
            duration: 'Long',
            count1: 20,
            price1: 71.7550,
            price2: 71.7550,
            change: 5.67,
        },
        {
            id: 2,
            title: 'RELIANCE',
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
            title: 'RELIANCE',
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
            title: 'USHAMART',
            tag1: 'NSE',
            tag2: 'CNC',
            duration: 'Short',
            count1: 30,
            price1: 50.7550,
            price2: 50.7550,
            change: 5.67,
        },
        {
            id: 5,
            title: 'USHAMART',
            tag1: 'NSE',
            tag2: 'CNC',
            duration: 'Long',
            count1: 20,
            price1: 71.7550,
            price2: 71.7550,
            change: 5.67,
        },
        {
            id: 6,
            title: 'USHAMART',
            tag1: 'NSE',
            tag2: 'CNC',
            duration: 'Long',
            count1: 20,
            price1: 71.7550,
            price2: 71.7550,
            change: 5.67,
        },
        {
            id: 7,
            title: 'USHAMART',
            tag1: 'NSE',
            tag2: 'CNC',
            duration: 'Long',
            count1: 20,
            price1: 71.7550,
            price2: 71.7550,
            change: -5.67,
        },
        {
            id: 8,
            title: 'USHAMART',
            tag1: 'NSE',
            tag2: 'CNC',
            duration: 'Long',
            count1: 20,
            price1: 71.7550,
            price2: 71.7550,
            change: 5.67,
        },
        {
            id: 9,
            title: 'USHAMART',
            tag1: 'NSE',
            tag2: 'CNC',
            duration: 'Long',
            count1: 20,
            price1: 71.7550,
            price2: 71.7550,
            change: 5.67,
        },
        {
            id: 10,
            title: 'USHAMART',
            tag1: 'NSE',
            tag2: 'CNC',
            duration: 'Long',
            count1: 20,
            price1: 71.7550,
            price2: 71.7550,
            change: -5.67,
        },
        {
            id: 11,
            title: 'USHAMART',
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
        'justify-content': 'space-between',
        'align-items': 'center',
    }

    const [positions, setPositions] = useState(fakePositionsData);

    return (
        <div style={{ height: '-webkit-fill-available', overflow: 'auto' }}>
            <Heading pt='10px' pb='5px' as='h1' size='sm'>Positions</Heading>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {
                    positions && positions.map(singleData =>
                        <Box boxShadow={'0 7px 30px -10px rgba(150,170,180,0.5)'} bgColor={'cyan.100'} color={'black'} px='20px' py='15px' w='80%' mt='10px' maxW='md' borderWidth='0px' borderRadius='lg' key={singleData.id}
                            style={customStyle}
                        >
                            <div>
                                <div style={customStyle}>
                                    <Text fontSize='sm'>{singleData.title}</Text>
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
                            </div>
                        </Box>
                    )
                }
            </div>
        </div>
    )
}

export default Positions;