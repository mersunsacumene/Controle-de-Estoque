import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Box } from '@mui/material';
import onepng from './static/1.png';
import twopng from './static/2.png';
import threepng from './static/3.png';

const items = [
  { image: twopng, title: 'Imagem 2' },
  { image: onepng, title: 'Imagem 1' },
  { image: threepng, title: 'Imagem 3' },
  { image: twopng, title: 'Imagem 2' },
  { image: onepng, title: 'Imagem 1' },
  { image: threepng, title: 'Imagem 3' },
];

function Carroussel() {
    return (
        <Carousel
            animation="slide"
            duration={200}
            navButtonsAlwaysVisible
            autoPlay={true}
            interval={3000}
            indicatorContainerProps={{
                style: {
                    marginTop: '700px',
                    justifyContent: 'center'
                },
            }}
            indicatorIconButtonProps={{
                style: {
                    padding: '5px',
                    color: '#c4c4c4',
                },
            }}
            activeIndicatorIconButtonProps={{
                style: {
                    color: '#3f51b5',
                },
            }}
        >
            <CarouselItem items={items} />
        </Carousel>
    );
}

function CarouselItem({ items }) {
    return (
        <Paper>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: '20px' }}
            >
                {items.slice(0, 3).map((item, index) => (
                    <Box
                        key={index}
                        component="img"
                        src={item.image}
                        alt={item.title}
                        sx={{
                            width: 'maxWidth',
                            height: 'maxHeight',
                            marginRight: index < 2 ? '40px' : '0',
                        }}
                    />
                ))}
            </Box>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ marginTop: '20px' }}
        >
            {items.slice(0, 3).map((item, index) => (
                <Box
                    key={index}
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                        width: 'maxWidth',
                        height: 'maxHeight',
                        marginRight: index < 2 ? '40px' : '0',
                    }}
                />
            ))}
        </Box>
    </Paper>
    );
}

export default Carroussel;
