import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Box } from '@mui/material';
import onepng from './static/1.png';
import twopng from './static/2.png';
import threepng from './static/3.png';

const items = [
  {
    image: twopng,
    title: 'Imagem 2',
  },
  {
    image: onepng,
    title: 'Imagem 1',
  },
  {
    image: threepng,
    title: 'Imagem 3',
  },  {
    image: twopng,
    title: 'Imagem 2',
  },
  {
    image: onepng,
    title: 'Imagem 1',
  },
  {
    image: threepng,
    title: 'Imagem 3',
  },  {
    image: twopng,
    title: 'Imagem 2',
  },
  {
    image: onepng,
    title: 'Imagem 1',
  },
  {
    image: threepng,
    title: 'Imagem 3',
  },
];

function Carroussel() {
  return (
    <Carousel 
      animation="slide" 
      duration={200} 
      navButtonsAlwaysVisible 
      indicatorContainerProps={{
        style: {
          marginTop: '10px',
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
      {items.map((item, index) => (
        <CarouselItem key={index} item={item} />
      ))}
    </Carousel>
  );
}

function CarouselItem({ item }) {
  return (
    <Paper>
      <Box
        component="img"
        src={item.image}
        alt={item.title}
        sx={{
          width: '100%',
          height: 'auto',
          marginTop: '250px',
        }}
      />
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Button variant="contained" color="primary">
          Ver Mais
        </Button>
      </Box>
    </Paper>
  );
}

export default Carroussel;
