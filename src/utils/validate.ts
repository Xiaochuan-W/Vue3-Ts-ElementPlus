
export function isExternal(path: string):boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validUsername(str:string):boolean {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export const validateNo = (rule: any, value: string, callback: any):undefined => {
  const regexp = /^[a-zA-Z0-9\.]{1,16}$/
  if (!value) {
    return callback(new Error('疫苗编号不能为空'));
  }
  if (!regexp.test(value)) {
    return callback(new Error('由1-16位英文、数字和.组成'));
  }
  return callback()
}

export const validateMobile = (rule:any, value:string, callback:any):undefined => {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!reg.test(value)) {
    return callback(new Error('手机号格式错误'));
  } else {
    return callback();
  }
}
