import { Box, Button, Center } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import InputField from 'src/components/InputField';
import { useGetCurrentUserQuery, useLoginMutation } from 'src/generated/graphql';
import { toErrorMap } from 'src/utils/toErrorMap';

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const { data } = useGetCurrentUserQuery();
  // TODO - assigin type for setErrors
  const handleSubmit = async (username: string, password: string, setErrors: any ): Promise<void> => {
    const response = await login({ variables: { options: { username, password }}});
    
    if (response.data?.login.errors) {
      setErrors(toErrorMap(response.data.login.errors));
    } else if (response.data?.login.user) {
      // router.push('/');
      // console.log('user', data?.getCurrentUser);
      console.log('i am here');
    }  
  };

  return (
    <Center mx="auto" w="350px" h="100%">
      <Formik 
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { username, password } = values;
          handleSubmit(username, password, setErrors);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb="100%">
              <InputField name="username" placeholder="nazwa użytkownika" label="nazwa użytkownika" />
              <Box mt={4}>
                <InputField name="password" placeholder="hasło" label="hasło" type="password" />
              </Box>
              <Button colorScheme="teal" mt={4} isLoading={isSubmitting} type="submit" >zaloguj się</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Center>
  );
}

export default Login;