import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatClockIcon, RepeatIcon } from '@chakra-ui/icons';
import { Box, Heading, Text, Grid, GridItem, Menu, MenuButton, MenuList, MenuIcon, IconButton, MenuItem } from '@chakra-ui/react';
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
            'id': 'MCX:SILVERMIC22AUGFUT-MARGIN'
        },
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
            'id': 'MCX:SILVERMIC24AUGFUT-MARGIN'
        }
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

            <Grid templateColumns='repeat(9, 1fr)' gap={6} maxWidth='100%' marginTop='5vh' margin='2vh' padding='0vh 5vh 0vh 5vh' textAlign='left' >
                <GridItem w='15vh' h='10'>
                    <Text color='gray.500' fontSize='sm'>Symbol: </Text>
                </GridItem>

                <GridItem w='100%' h='10'>
                    <Text color='gray.500' fontSize='sm'>Product: </Text>
                </GridItem>

                <GridItem w='100%' h='10'>
                    <Text color='gray.500' fontSize='sm'>Up: </Text>
                </GridItem>

                <GridItem w='100%' h='10'>
                    <Text color='gray.500' fontSize='sm'>Side: </Text>
                </GridItem>

                <GridItem w='100%' h='10'>
                    <Text color='gray.500' fontSize='sm'>Buy Qty: </Text>
                </GridItem>

                <GridItem w='100%' h='10'>
                    <Text color='gray.500' fontSize='sm'>Avg Price: </Text>
                </GridItem>

                <GridItem w='100%' h='10'>
                    <Text color='gray.500' fontSize='sm'>LTP: </Text>
                </GridItem>
                <GridItem w='100%' h='10'>
                    <Text color='gray.500' fontSize='sm'>Profit/Loss: </Text>
                </GridItem>

                <GridItem w='100%' h='10' textAlign='center'>
                    <Text color='gray.500' fontSize='sm'>Edit/Exit </Text>
                </GridItem>

                {/* <Text color='gray.500' fontSize='sm'>Symbol: </Text> */}

            </Grid>
            {
                positions && positions.map(singleData =>


                    <Grid templateColumns='repeat(9, 1fr)' gap={6} margin='2vh' maxWidth='100%' paddingLeft='5vh' paddingRight='5vh' paddingTop='2vh' textAlign='left' className='boxShadow' borderRadius='12px'>
                        <GridItem w='15vh' h='10'>
                            <Text color='gray.500' fontSize='sm'>{singleData.symbol.split(':')[1]}</Text>
                        </GridItem>

                        <GridItem w='100%' h='10'>
                            <Text color='gray.500' fontSize='sm'>{singleData.symbol.split(':')[0]} </Text>
                        </GridItem>

                        <GridItem w='100%' h='10'>
                            <Text color='gray.500' fontSize='sm'>{singleData.unrealized_profit} </Text>
                        </GridItem>

                        <GridItem w='100%' h='10'>
                            <Text color='gray.500' fontSize='sm'>{singleData.side}</Text>
                        </GridItem>

                        <GridItem w='100%' h='10'>
                            <Text color='gray.500' fontSize='sm'>{singleData.buyQty}</Text>
                        </GridItem>

                        <GridItem w='100%' h='10'>
                            <Text color='gray.500' fontSize='sm'>{singleData.avgPrice}</Text>
                        </GridItem>

                        <GridItem w='100%' h='10'>
                            <Text color='gray.500' fontSize='sm'>{singleData.ltp}</Text>
                        </GridItem>
                        <GridItem w='100%' h='10'>
                            <Text fontWeight='bold' fontSize='sm' color={singleData.pl > 0 ? 'green.600' : 'red.300'} >{singleData.pl}</Text>
                        </GridItem>

                        <GridItem w='100%' h='12' textAlign='center'>
                            <Menu >
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<HamburgerIcon />}
                                    variant='outline'
                                    size='sm'
                                />
                                <MenuList>
                                    <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
                                        Modify Trade
                                    </MenuItem>
                                    <MenuItem icon={<EditIcon />} command='⌘O'>
                                        Exit Trade
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </GridItem>

                        {/* <Text color='gray.500' fontSize='sm'>Symbol: </Text> */}

                    </Grid>
                )
            }
        </div>
    )
}

export default Positions;