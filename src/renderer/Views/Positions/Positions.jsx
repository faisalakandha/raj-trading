import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const Positions = () => {

    const fakePositionsData = [
        {
            'netQty': 1,
            'qty': 1,
            'avgPrice': 72256.0,
            'netAvg': 71856.0,
            'side': 1,
            'productType': 'MARGIN',
            'realized_profit': 400.0,
            'unrealized_profit': 461.0,
            'pl': 861.0,
            'ltp': 72717.0,
            'buyQty': 2,
            'buyAvg': 72256.0,
            'buyVal': 144512.0,
            'sellQty': 1,
            'sellAvg': 72656.0,
            'sellVal': 72656.0,
            'slNo': 0,
            'fyToken': '1120200831217406',
            'dummy': '',
            'crossCurrency': 'N',
            'rbiRefRate': 1.0,
            'qtyMulti_com': 1.0,
            'segment': 20,
            'symbol': 'MCX:SILVERMIC20AUGFUT',
            'id': 'MCX:SILVERMIC20AUGFUT-MARGIN'
        },

        // {
        //     id: 1,
        //     title: 'USHAMART',
        //     tag1: 'NSE',
        //     tag2: 'CNC',
        //     duration: 'Long',
        //     count1: 20,
        //     price1: 71.7550,
        //     price2: 71.7550,
        //     change: 5.67,
        // },
        // {
        //     id: 2,
        //     title: 'RELIANCE',
        //     tag1: 'NSE',
        //     tag2: 'CNC',
        //     duration: 'Long',
        //     count1: 20,
        //     price1: 71.7550,
        //     price2: 71.7550,
        //     change: 5.67,
        // },
        // {
        //     id: 3,
        //     title: 'RELIANCE',
        //     tag1: 'NSE',
        //     tag2: 'CNC',
        //     duration: 'Short',
        //     count1: 20,
        //     price: 80,
        //     price2: 71.7550,
        //     change: -20,
        // },
        // {
        //     id: 4,
        //     title: 'USHAMART',
        //     tag1: 'NSE',
        //     tag2: 'CNC',
        //     duration: 'Short',
        //     count1: 30,
        //     price1: 50.7550,
        //     price2: 50.7550,
        //     change: 5.67,
        // },
        // {
        //     id: 5,
        //     title: 'USHAMART',
        //     tag1: 'NSE',
        //     tag2: 'CNC',
        //     duration: 'Long',
        //     count1: 20,
        //     price1: 71.7550,
        //     price2: 71.7550,
        //     change: 5.67,
        // },
        // {
        //     id: 6,
        //     title: 'USHAMART',
        //     tag1: 'NSE',
        //     tag2: 'CNC',
        //     duration: 'Long',
        //     count1: 20,
        //     price1: 71.7550,
        //     price2: 71.7550,
        //     change: 5.67,
        // },
        // {
        //     id: 7,
        //     title: 'USHAMART',
        //     tag1: 'NSE',
        //     tag2: 'CNC',
        //     duration: 'Long',
        //     count1: 20,
        //     price1: 71.7550,
        //     price2: 71.7550,
        //     change: -5.67,
        // },
        // {
        //     id: 8,
        //     title: 'USHAMART',
        //     tag1: 'NSE',
        //     tag2: 'CNC',
        //     duration: 'Long',
        //     count1: 20,
        //     price1: 71.7550,
        //     price2: 71.7550,
        //     change: 5.67,
        // },
        // {
        //     id: 9,
        //     title: 'USHAMART',
        //     tag1: 'NSE',
        //     tag2: 'CNC',
        //     duration: 'Long',
        //     count1: 20,
        //     price1: 71.7550,
        //     price2: 71.7550,
        //     change: 5.67,
        // },
        // {
        //     id: 10,
        //     title: 'USHAMART',
        //     tag1: 'NSE',
        //     tag2: 'CNC',
        //     duration: 'Long',
        //     count1: 20,
        //     price1: 71.7550,
        //     price2: 71.7550,
        //     change: -5.67,
        // },
        // {
        //     id: 11,
        //     title: 'USHAMART',
        //     tag1: 'NSE',
        //     tag2: 'CNC',
        //     duration: 'Long',
        //     count1: 20,
        //     price1: 71.7550,
        //     price2: 71.7550,
        //     change: 5.67,
        // },
    ];

    const customStyle = {
        'display': 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
    }

    const [positions, setPositions] = useState(fakePositionsData);

    return (
        <div style={{ height: '-webkit-fill-available', overflow: 'auto', fontFamily: 'poppins' }}>
            <Heading pt='10px' pb='5px' as='h1' size='sm' fontFamily='poppins'>Positions</Heading>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {
                    positions && positions.map(singleData =>
                        <Box boxShadow={'0 7px 30px -10px rgba(150,170,180,0.5)'} bgColor={'cyan.100'} color={'black'} px='20px' py='15px' w='80%' mt='10px' maxW='md' borderWidth='0px' borderRadius='lg' key={singleData.id}
                            style={customStyle}
                        >
                            <div>
                                <div style={customStyle}>
                                    <Text fontSize='sm'>{singleData.symbol.split(':')[1]}</Text>
                                    <Text fontSize='sm' ml='10px' >{singleData.symbol.split(':')[0]}</Text>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text color='gray.500' fontSize='sm'>UP: {singleData.unrealized_profit}</Text>
                                    <Text color='gray.500' ml='5px' fontSize='sm'>Side: {singleData.side}</Text>
                                    <Text color='gray.500' ml='5px' fontSize='sm'>Buy Qty: {singleData.buyQty}</Text>
                                    <Text color='gray.500' ml='5px' fontSize='sm'> at </Text>
                                    <Text color='gray.500' ml='5px' fontSize='sm'>{singleData.price1}</Text>
                                </div>
                            </div>
                            <div>
                                <Text fontSize='sm'>LTP: {singleData.ltp}</Text>
                                <Text fontWeight='bold' fontSize='sm' color={singleData.pl > 0 ? 'green.600' : 'red.300'} >{singleData.pl}</Text>
                            </div>
                        </Box>
                    )
                }
            </div>
        </div>
    )
}

export default Positions;