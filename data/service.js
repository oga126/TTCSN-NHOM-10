import db from './index';

// file chứa các hàm xử lý với database

// hàm lấy ra product theo loại từ database
const getListProductByType = (type) =>
  Object.values(db.nl_mat_troi.children).find((item) => item.slugy === type);

// hàm lấy ra product theo id (index) từ mảng các sản phẩm
const getProductByIdInList = (index, products) => products.find((item) => item.index === index);

// hàm lấy ra product theo tên dạng slugy trong mảng các sản phẩm
const getProductBySlugyNameInList = (slugy, products) =>
  products.find((item) => item.slugy_name === slugy);

export { getListProductByType, getProductByIdInList, getProductBySlugyNameInList };
