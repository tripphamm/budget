import * as React from 'react';
import NumberFormat from 'react-number-format';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

function numberFormatCustom(props: any) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

export default function currencyTextField(props: TextFieldProps) {
  return (
    <TextField
      type="number"
      InputProps={{
        inputComponent: numberFormatCustom,
      }}
      {...props}
    />
  );
}
