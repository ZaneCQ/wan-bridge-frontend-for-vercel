import { useState } from 'react';
import { createModel } from 'hox';

const initialFormData = {
  asset: null,
  from: null,
  to: null,
  amount: '0',
  fee: '0',
};

const useFormData = (initial) => {
  const [values, setValues] = useState(() => initial);
  const modify = (newData) => {
    setValues({
      ...values,
      ...newData,
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
