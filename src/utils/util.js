
const TPL_REG = /\$\{(.+?)\}/g; //模板字符串变量正则
const STRING_REG = /^('.*'|".*")$/; //字符串正则
const NUMBER_REG = /^(0|[1-9]\d*)(\.\d+)?$/; //数字正则
const RESERVED_VALUE = { //预留值
  undefined: void 0,
  null: null,
  true: true,
  false: false
}
const _VALUE_REG = /(\w+|'.*'|".*")/; //值（变量、字符串、预留值、数字）正则
const _COMPARE_EXP_REG = new RegExp(_VALUE_REG.source + "(==|===|<|>)" + _VALUE_REG.source); //比较表达式正则
const COMPARE_EXP_REG = new RegExp("^" + _COMPARE_EXP_REG.source + "$"); //比较表达式正则
const TERNARY_EXP_REG = new RegExp("^" + _COMPARE_EXP_REG.source + "\\\?" + _VALUE_REG.source + ":" + _VALUE_REG.source + "$"); //三目运算符正则
const TERNARY2_EXP_REG = new RegExp("^" + _VALUE_REG.source + "\\\?" + _VALUE_REG.source + ":" + _VALUE_REG.source + "$"); //三目运算符正则

const cachedTpl = {};
/**
 * 编译模板字符串,返回渲染函数 
 * @param {String} str
 */
function compileTemplateStr(str) {
  if (!str) {
    return function(o) {
      return '';
    };
  }
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
    variable = variable.trim();
    let m;
    if (m = variable.match(TERNARY_EXP_REG)) {
      arr.push({
        type: "ternaryExp",
        left: m[1],
        oper: m[2],
        right: m[3],
        trueValue: m[4],
        falseValue: m[5]
      });
    } else if (m = variable.match(TERNARY2_EXP_REG)) {
      arr.push({
        type: "ternary2Exp",
        value: m[1],
        trueValue: m[2],
        falseValue: m[3]
      });
    } else if (m = variable.match(COMPARE_EXP_REG)) {
      arr.push({
        type: "compileExp",
        left: m[1],
        oper: m[2],
        right: m[3]
      });
    } else {      
      arr.push({
        type: 'variable',
        value: variable.trim()
      });
    }
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
        return getValue(item.value, o);
      }
      if (item.type === 'compileExp') {
        return getValueForCompare(item, o);
      }
      if (item.type === 'ternaryExp' || item.type === 'ternary2Exp') {
        return getValueForTernary(item, o);
      }
      return item.value;
    }).join('');
  }
  cachedTpl[str] = render;
  return render;
}

/**
 * 获取值
 * @param {Object} valueStr
 * @param {Object} o
 */
function getValue(valueStr, o) {
  if (STRING_REG.test(valueStr)) {
    return valueStr.replace(/(^['"]|['"]$)/g, '');
  }
  if (NUMBER_REG.test(valueStr)) {
    return +valueStr;
  }
  if (valueStr in RESERVED_VALUE) {
    return RESERVED_VALUE[valueStr];
  }
  return o[valueStr];
}

/**
 * 获取比较表达式的值
 * @param {Object} item
 * @param {Object} o
 */
function getValueForCompare(item, o) {
  let {left, oper, right} = item;
  switch(oper) {
    case "==":
      return getValue(left, o) == getValue(right, o);
    case "===":
      return getValue(left, o) === getValue(right, o);
    case ">":
      return getValue(left, o) > getValue(right, o);
    case "<":
      return getValue(left, o) < getValue(right, o);
  }
  return false;
}
/**
 * @param {Object} num
 * 单位转换 19999转换成1.9w
 */
export function unitChange(num){
  if(num<10000){
    return num + ''
  }
  return (Math.floor(num/1000)/10).toFixed(1) + ''
}

/**
 * 获取三目运算符的值
 * @param {Object} item
 * @param {Object} o
 */
function getValueForTernary(item, o) {
  if (item.type === "ternary2Exp") {
    return getValue(item.value, o) ? getValue(item.trueValue, o) : getValue(item.falseValue, o);
  }
  return getValueForCompare(item, o) ? getValue(item.trueValue, o) : getValue(item.falseValue, o);
}

export {
  compileTemplateStr,
  
}