import { useState, useEffect } from 'react';
import { createModel } from 'hox';

const useHistory = () => {
  const [list, setList] = useState([]);
  const getList = () => {
    fetch('/api/history/list')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log('##### list:', res.list);
        setList(res.list);
      })
      .catch((err) => {
        console.log('failed to fetch history list:', err);
      });
  };
  const getInfoByKey = (key) => list.find((item) => item.key === key);

  useEffect(getList, []);

  return { list, getList, getInfoByKey };
};

export default createModel(useHistory);
