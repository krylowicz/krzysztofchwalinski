import { Box, Button, Center, Input } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const handleSubmit = (username: string, password: string): void => console.log(username, password);

  return (
    <Center mx="auto" w="350px" h="100%">
      <Formik 
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          const { username, password } = values;
          handleSubmit(username, password);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb="100%">
              <Input name="username" placeholder="nazwa użytkownika" label="Nazwa użytkownika" />
              <Input name="password" placeholder="hasło" label="hasło" type="password" mt={4} />
              <Button colorScheme="teal" mt={4} isLoading={isSubmitting} type="submit" >zaloguj się</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Center>
  );
}

export default Login;