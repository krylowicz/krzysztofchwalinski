import { Center, Box, Button } from '@chakra-ui/core';
import axios from 'axios';
import { Formik, Form } from 'formik';
import React, { useCallback, useRef } from 'react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import InputField from 'src/components/InputField';
import { useUploadPhotoMutation } from 'src/generated/graphql';

interface UploadProps {}

export const Upload: React.FC<UploadProps> = ({}) => {
  const [uploadPhoto] = useUploadPhotoMutation();
  const photoUrl: any = useRef('');
  const [isUploaded, setIsUploaded] = useState(false);
  const maxSize = 10485760;
  const onDrop = useCallback(async ([file]): Promise<void | undefined> => {
    const photo = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    // const photoObjectUrl = URL.createObjectURL(file);

    axios({
      method: 'get',
      url: photo.preview,
      responseType: 'blob',
    }).then((res) => {
      const reader = new FileReader();
      reader.readAsDataURL(res.data);
      reader.onloadend = function () {
        setIsUploaded(true);
        photoUrl.current = reader.result;
        console.log(photoUrl.current);
      };
    });
  }, []);

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: ['image/jpeg', 'image/jpg'],
    minSize: 0,
    maxSize,
  });

  return (
    <Center mx='auto' h='100%'>
      <Formik
        initialValues={{ title: '', description: '', tag: '' }}
        onSubmit={async (values) => {
          const { title, description, tag } = values;
          const photo_url = photoUrl.current;

          try {
            await uploadPhoto({
              variables: { options: { photo_url, title, tag, description } },
            });
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box
              px={5}
              py={10}
              shadow='md'
              borderWidth='1px'
              {...getRootProps()}
              cursor='pointer'
            >
              <input {...getInputProps()} />
              {isUploaded
                ? 'zdjęcie przesłane'
                : 'kliknij lub upuść zdjęcie aby przesłać'}
              {/* {!isDragActive && 'click here or drop a file'}
              {isDragActive && !isDragReject && 'drop file'} */}
            </Box>
            <InputField name='title' placeholder='Tytuł' label='Tytuł' />
            <InputField name='tag' placeholder='Kategoria' label='Kategoria' />
            <InputField
              name='description'
              placeholder='Opis'
              label='Opis'
              isTextArea
            />
            <Button type='submit' isLoading={isSubmitting}>
              prześlij zdjęcie
            </Button>
          </Form>
        )}
      </Formik>
    </Center>
  );
};

export default Upload;
