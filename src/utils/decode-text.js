import { emojiMap } from './emoji-map.js'
/**
 * 解码文本消息中的表情和链接
 * @param {string} text
 */
export function decodeText(text) {
  if (!text) {
    return "";
  }
  return atDecode(emojiDecode(htmlEncode(text)));
}

/**
 * 过滤字符串中的尖括号，以防XSS攻击
 * @param {string} str
 */
export function htmlEncode(str) {
  return str.replace(/[><]/g, function (m1) {
    switch (m1) {
      case ">":
        return "&gt;"
      case "<":
        return "&lt;"
    }
    return m1;
  });
}

/**
 * 表情解码成img标签
 * @param {string} str
 */
export function emojiDecode(str) {
  return str.replace(
    /\[([A-Z\u4e00-\u9fa5]+)\]/g,
    function (m1) {
      return emojiMap[m1] ? `</span><img class="emoji" alt="${m1}" src="${emojiMap[m1]}"/><span class="text">` : m1
    }
  );
}

/**
 * 链接解码成a标签
 * @param {string} str
 */
export function linkDecode(str) {
  return str.replace(
    // TAB是\x09，空格是\x20，回车是\x0a
    // eslint-disable-next-line no-control-regex
    /(www\.|(http|https|ftp):\/\/)[\x0b-\x1f\x21-\xff]+/g,
    function (m1, m2) {
      let url = m1;
      if (m2 === "www.") {
        url = "http://" + m1;
      }
      return `<a class="link" href="${url}" target="_blank">${m1}</a>`;
    }
  )
}

/**
 * 群消息中“@消息”显示解码
 * @param {Object} str
 */
export function atDecode(str) {
  return str.replace(
    /@(.+?)\[(zeus_\d+)\]/g,
    function (m1, m2, m3) {
      return `<span class="at">@${m2}</span>`;
    }
  ).replace(
    /@(所有人|all)\[0\]/ig,
    function (m1, m2, m3) {
      return `<span class="at">@${m2}</span>`;
    }
  )
}

/**
 * 组成正则的关键字先转换一下匹配字符，转换的字符有 * . \ ( ) [ ] { } < > ? ^ $ +
 * @param {string} str
 */
export function keywordEncode(str) {
  return str.replace(/([*.\\()[\]{}<>?^$+])/g, "\\$1")
}