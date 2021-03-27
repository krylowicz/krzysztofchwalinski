import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/core';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  isTextArea?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  isTextArea,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);

  let Component: any = Input;

  if (isTextArea) Component = Textarea;

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel html={field.name}>{label}</FormLabel>
      <Component
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
