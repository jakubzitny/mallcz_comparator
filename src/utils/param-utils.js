
export default class ParamUtils {
  static formatParams(params) {
    if (!params || !params.length) {
      return []
    }

    return params
      .filter((param) => {
        const [ type ] = param

        return (type !== 'UP')
      })
      .reduce((params, param, index) => {
        if (!param || param.length < 2) {
          console.warn('weird param', param)

          return params
        }

        const [ id, type ] = param
        params[index] = {
          id,
          type,
          value: 0.5,
        }

        return params
      }, {})
  }

  static formatUserPrefs(params) {
    if (!params) {
      return []
    }

    return Object.keys(params).map((key) => {
      const param = params[key]

      return {
        'PrefCategory': param.id,
        'PrefStrength': param.value,
      }
    })
  }
}
