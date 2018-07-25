import Vue from 'vue'
import VeeValidate from 'vee-validate'
import i18n from './i18n'
const dictionary = {
  name: 'zh_CN',
  messages: {
    after: function(n, e) {
      return ' ' + n + '必须在' + e[0] + '之后'
    },
    alpha_dash: function(n) {
      return ' ' + n + '能够包含字母数字字符，包括破折号、下划线'
    },
    alpha_num: function(n) {
      return n + ' 只能包含字母数字字符'
    },
    alpha_spaces: function(n) {
      return ' ' + n + ' 只能包含字母字符，包括空格'
    },
    alpha: function(n) {
      return ' ' + n + ' 只能包含字母字符'
    },
    before: function(n, e) {
      return ' ' + n + ' 必须在' + e[0] + ' 之前'
    },
    between: function(n, e) {
      return ' ' + n + ' 必须在' + e[0] + ' ' + e[1] + '之间'
    },
    confirmed: function(n, e) {
      return ' ' + n + ' 不能和' + e[0] + '匹配'
    },
    date_between: function(n, e) {
      return ' ' + n + '必须在' + e[0] + '和' + e[1] + '之间'
    },
    date_format: function(n, e) {
      return ' ' + n + '必须在在' + e[0] + '格式中'
    },
    decimal: function(n, e) {
      void 0 === e && (e = [])
      var t = e[0]
      return (
        void 0 === t && (t = '*'),
        ' ' + n + ' 必须是数字的而且能够包含' + ('*' === t ? '' : t) + ' 小数点'
      )
    },
    digits: function(n, e) {
      return ' ' + n + ' 必须是数字，且精确到 ' + e[0] + '数'
    },
    dimensions: function(n, e) {
      return ' ' + n + '必须是 ' + e[0] + ' 像素到 ' + e[1] + ' 像素'
    },
    email: function(n) {
      return ' ' + n + ' 必须是有效的邮箱'
    },
    ext: function(n) {
      return ' ' + n + ' 必须是有效的文件'
    },
    image: function(n) {
      return ' ' + n + ' 必须是图片'
    },
    in: function(n) {
      return ' ' + n + ' 必须是一个有效值'
    },
    ip: function(n) {
      return ' ' + n + ' 必须是一个有效的地址'
    },
    max: function(n, e) {
      return ' ' + n + ' 不能大于' + e[0] + '字符'
    },
    max_value: function(n, e) {
      return ' ' + n + ' 必须小于或等于' + e[0] + ''
    },
    mimes: function(n) {
      return ' ' + n + ' 必须是有效的文件类型'
    },
    min: function(n, e) {
      return ' ' + n + ' 必须至少有 ' + e[0] + ' 字符'
    },
    min_value: function(n, e) {
      return ' ' + n + ' 必须大于或等于' + e[0] + ''
    },
    not_in: function(n) {
      return ' ' + n + '必须是一个有效值'
    },
    numeric: function(n) {
      return ' ' + n + ' 只能包含数字字符'
    },
    regex: function(n) {
      return ' ' + n + ' 格式无效'
    },
    required: function(n) {
      return i18n.messages[i18n.locale].Required
    },
    size: function(n, e) {
      return (
        ' ' +
        n +
        ' 必须小于 ' +
        (function(n) {
          var e =
            0 == (n = 1024 * Number(n))
              ? 0
              : Math.floor(Math.log(n) / Math.log(1024))
          return (
            1 * (n / Math.pow(1024, e)).toFixed(2) +
            ' ' +
            ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][e]
          )
        })(e[0]) +
        ''
      )
    },
    url: function(n) {
      return ' ' + n + '不是有效的url'
    }
  },
  attributes: {}
}
const veeConfig = {
  errorBagName: 'errors', // change if property conflicts
  fieldsBagName: 'vee-fields',
  delay: 0,
  strict: true,
  classes: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input|blur',
  inject: true,
  validity: false,
  aria: true,
  i18n: null, // the vue-i18n plugin instance,
  i18nRootKey: 'validations' // the nested key under which the validation messsages will be located
}
Vue.use(VeeValidate, veeConfig)

Validator.extend(
  'postcode', {
    getMessage: field => field + ' 应为6位数字.',
    validate: value => /^[0-9]{6}$/.test(value)
  })
var result1 = true;
Validator.extend('beforeDate', {
    getMessage: (field,args) => field + ' 应该在'+args[0]+'之前.',
    validate: (value,args) => {
      if(value._isVue){
        return result1;
      }
      if(args==null || args[0]==null){
        result1 = true
      }else{
        result1 = value<=args[0]
      }
      return result1;
    }
})
var result2 = true;
Validator.extend('afterDate', {
    getMessage: (field,args) => field + ' 应该在'+args+'之后.',
    validate: (value,args) => {
      if(value._isVue){
        return result2;
      }
      if(args==null || args[0]==null){
        result2 = true
      }else{
        result2 = value>=args[0]
      }
      return result2;
    }
  });
Validator.extend('phone', {
    getMessage: (field) => field + '格式不正确.',
    validate: (value) => /^[1][3,4,5,7,8][0-9]{9}$/.test(value)
  });
Validator.extend('tel', {
    getMessage: (field) => field + '格式不正确.',
    validate: (value) => /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value)
  });
Validator.extend('Number', {
  getMessage: field => field + '必须为数字.',
  validate: value => /^[0-9]+.?[0-9]*$/.test(value)
});
Validator.extend('Length', {
  getMessage: field => field + '内容长度超出.',
  validate: value => /^[a-zA-Z\d\_\u2E80-\u9FFF]{0,1000}$/.test(value)
});
    
import { Validator } from 'vee-validate'

Validator.localize('zh_CN',dictionary)

Validator.extend('postcode', {
  getMessage: field => field + ' 应为6位数字.',
  validate: value => /^[0-9]{6}$/.test(value)
})
var result1 = true
Validator.extend('beforeDate', {
  getMessage: (field, args) => field + ' 应该在' + args[0] + '之前.',
  validate: (value, args) => {
    if (value._isVue) {
      return result1
    }
    if (args == null || args[0] == null) {
      result1 = true
    } else {
      result1 = value <= args[0]
    }
    return result1
  }
})
var result2 = true
Validator.extend('afterDate', {
  getMessage: (field, args) => field + ' 应该在' + args + '之后.',
  validate: (value, args) => {
    if (value._isVue) {
      return result2
    }
    if (args == null || args[0] == null) {
      result2 = true
    } else {
      result2 = value >= args[0]
    }
    return result2
  }
})
Validator.extend('phone', {
  getMessage: field => field + ' 格式不正确.',
  validate: value => /^[1][3,4,5,7,8][0-9]{9}$/.test(value)
})
Validator.extend('tel', {
  getMessage: field => field + ' 格式不正确.',
  validate: value =>
    /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value)
})
Validator.extend('Number', {
  getMessage: field => field + ' 必须为数字.',
  validate: value => /^[0-9]+.?[0-9]*$/.test(value)
})
Validator.extend('Length', {
  getMessage: field => field + '.',
  validate: value => /^[a-zA-Z\d\_\u2E80-\u9FFF]{0,1000}$/.test(value)
  });
  export default Validator