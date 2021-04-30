import { useState } from 'react';
import { createModel } from 'hox';

/* const initialFormData = {
  asset: null,
  from: null,
  to: null,
  fromAddress: undefined,
  toAddress: undefined,
  amount: '0',
  fee: '0',
  step: 1, // step 0: sending form, step 1: confirmation
}; */

const initialFormData = {
  asset: 'WAN',
  from: 'Wanchain',
  to: 'Ethereum',
  fromAddress: '0xD8e5278B1AAb05C9AA07C60d44dc97653B9AE3D8',
  toAddress: '0xFB683bDDB0ACBB00Dd162CD5E3798c7Fc6E5CFc0',
  amount: '100',
  fee: '0.3',
  step: 1, // step 0: sending form, step 1: confirmation
};

const useFormData = (initial) => {
  const [values, setValues] = useState(() => initial);

  const modify = (newData) => {
    setValues((newestState) => {
      return {
        ...newestState,
        ...newData,
      };
    });
  };

  const reset = () => {
    setValues(initial);
  };

  return {
    data: values,
    modify,
    reset,
  };
};

export default createModel(useFormData, initialFormData);
