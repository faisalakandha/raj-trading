import { Box, Center, Heading, Text } from '@chakra-ui/react';
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
        <div style={{ height: '-webkit-fill-available' }}>
            <Heading as='h1' size='sm' fontFamily='poppins' marginTop='10px'>P & L</Heading>
            <Center w='100%' h='80%'>
                <Heading as='h1' size='xl' fontFamily='poppins' textColor={"green.500"} > + 1000 </Heading>
            </Center>
            {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>

                <Heading as='h1' size='xl' fontFamily='poppins'> + 1000 </Heading>

            </div> */}
        </div>
    )
}

export default PAndL;