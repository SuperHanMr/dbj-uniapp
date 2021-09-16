function objectToUrlString(obj) {
  console.log(obj)
  let temp = ""
  const keys = Object.keys(obj)
  for (let j = 0; j < keys.length; j++) {
    if(j < keys.length - 1) {
      temp += `${keys[j]}=${obj[keys[j]]}&` 
    } else {
      temp += `${keys[j]}=${obj[keys[j]]}` 
    }
  }
  console.log(temp)
  return temp
}
export {
  objectToUrlString
}