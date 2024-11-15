import React from 'react';
import Carroussel from './Carroussel';
import {Box} from "@mui/material";
import {useBackground} from "./static/UseBackGround";

function Home() {
    useBackground('favicon2.png');
    return (
      <Box style={{ height: "max-content" }}>
      <Carroussel />
      </Box>
    );
  }
  
  export default Home;
  