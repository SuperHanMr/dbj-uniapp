
const TPL_REG = /\$\{(.+?)\}/g;
const cachedTpl = {};
/**
 * 编译模板字符串,返回渲染函数 
 * @param {Object} str
 */
function compileTemplateStr(str) {
  if (cachedTpl[str]) {
    return cachedTpl[str];
  }
  const arr = [];
  let matched = TPL_REG.exec(str);
  let cursor = 0;
  while(matched) {
    let index = matched.index;
    let matchedStr = matched[0];
    let variable = matched[1];
    if (index > cursor) {
      arr.push({
        type: 'string',
        value: str.slice(cursor, index)
      })
    }
    arr.push({
      type: 'variable',
      value: variable.trim()
    });
    cursor = index + matchedStr.length;
    matched = TPL_REG.exec(str);
  }
  if (cursor < str.length) {
    arr.push({
      type: 'string',
      value: str.slice(cursor, str.length)
    })
  }
  const render = function(o) {
    return arr.map(function(item) {
      if (item.type === 'variable') {
        return o[item.value];
      }
      return item.value;
    }).join('');
  }
  cachedTpl[str] = render;
  return render;
}

export {
  compileTemplateStr
}