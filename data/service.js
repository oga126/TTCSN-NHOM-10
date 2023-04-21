import db from './index';

// file chứa các hàm xử lý với database 

const getListProductByType = (type) =>
  Object.values(db.nl_mat_troi.children).find((item) => item.slugy === type);

const getProductByIdInList = (index, products) => products.find((item) => item.index === index);

const getProductBySlugyNameInList = (slugy, products) =>
  products.find((item) => item.slugy_name === slugy);

export { getListProductByType, getProductByIdInList, getProductBySlugyNameInList };
