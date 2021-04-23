import { validate } from 'bitcoin-address-validation';
import { isValidChecksumAddress } from 'ethereumjs-util';
import { isValidChecksumAddress as isWanValidChecksumAddress } from 'wanchainjs-util';

export const isAddress = (address, chain) => {
  // console.log(`isAddress ${address} ${chain}`)
  if (!address || address.length < 34) {
    console.log(`length < 34`);
    return false;
  }
  if (chain === 'Ethereum' || chain === 'BSC') {
    if (isValidChecksumAddress(address)) {
      return true;
    } else {
      return false;
    }
    return true;
  } else if (chain === 'Wanchain') {
    if (isValidChecksumAddress(address) || isWanValidChecksumAddress(address)) {
      return true;
    } else {
      return false;
    }
  } else if (chain === 'Tron') {
    if (address.length === 34) {
      if (address.charAt(0) === 'T') {
        return true;
      }
      return false;
    } else {
      if (!/^(0x)?41[0-9a-f]{40}$/i.test(address)) {
        return false;
      }
      return true;
    }
  } else if (chain === 'Bitcoin') {
    if (validate(address)) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

export const convertStr2Hex_custom = (str = '') => {
  let hex = '';
  str = str || '';
  str.split('').forEach((c) => {
    hex += c.charCodeAt();
  });
  if (hex.length < 16) {
    hex = hex.padStart(16, '0');
  }
  return hex;
};

export const checkNumber = (num) => {
  const reg1 = /^[0-9]+$/;
  const reg2 = /^[0-9]+\.[0-9]+$/;
  return reg1.test(num) || reg2.test(num);
};
