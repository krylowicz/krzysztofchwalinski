import React from 'react';
import { Image } from '@chakra-ui/react';
import { Cloudinary } from 'cloudinary-core';

const Index = () => {
  const cloudinaryCore = new Cloudinary({ cloud_name: 'k-cloud' });
  const src = cloudinaryCore.url('sample');

  return <Image src={src} />;
};

export default Index;
