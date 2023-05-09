// chuyển dạng tiền VN về dạng số để tính toán
const convertPriceVNDToNum = (string = '') => {
  return +string.split('.').join('');
};

// chuyển dạng số về dạng giá tiền VN
const convertNumToPriceVND = (num) => {
  return num
    .toString()
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export { convertPriceVNDToNum, convertNumToPriceVND };
