// chuyển dạng tiền VN về dạng số để tính toán
const convertPriceVNDToNum = (string: String = ''): Number => {
  return +string.split('.').join('');
};

// chuyển dạng số về dạng giá tiền VN
const convertNumToPriceVND = (num: Number): String => {
  return num
    .toString()
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// chuyển Date về định dạng: ngày/tháng/năm
// ví dụ: Thứ Sáu, 19 tháng 5, 2023
const formatDate = (time: Date): String => {
  const result: String = time.toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return result;
};

// ví dụ: lúc 16:45:12 Thứ Sáu, 19 tháng 5, 2023
const formatTime = (time: Date): String => {
  return time.toLocaleTimeString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export { convertPriceVNDToNum, convertNumToPriceVND, formatDate, formatTime };
