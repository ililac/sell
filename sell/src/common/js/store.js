/***
 * 定义数据的存取
 */
export function saveLocal(id, key, value) {
  let seller = window.localStorage._seller_;
  if (!seller) { // 第一次存取
    seller = {};
    seller[id] = {};
    seller[id][key] = value;
  } else {
    seller = JSON.parse(seller); // 转成json对象
    if (!seller[id]) { // 如果没有改对象
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  localStorage._seller_ = JSON.stringify(seller); //  因为localStorage只能存取字符串
};

/***
 * def定义没有读取到数据
 */
export function loadFromLocal(id, key, def) {
  let seller = window.localStorage._seller_;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
}
