
export default class ProductUtils {
  static formatPriceNumber(number) {
    return`${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Kč`;
  }

  static getBaseProduct(data) {
    if (!data.results || !data.results.length) {
      throw new Error('No results.')
    }

    const result = data.results.find((result) => {
      return result['IsBase']
    })

    if (!result) {
      throw new Error('No base result.')
    }

    return result['Product']
  }

  static getChartData(data) {
    if (!data || !data.results || !data.results.length) {
      return []
    }

    return data.results.map((result) => {
      const resultProduct = result['Product']

      return {
        base: result['IsBase'],
        y: result['Score'],
        x: resultProduct['PRICE_VAT'],
        id: resultProduct['PRODUCTNO'],
        title: resultProduct['PRODUCTNAME'],
        ...ProductUtils.getProsAndConsFromDiff(result['Diff']),
        pointBackgroundColor: (result['IsBase']) ? '#db2828' : '#49a9ee',
        pointRadius: (result['IsBase']) ? 6 : 3,
      }
    })
  }

  static getProsAndConsFromDiff(diff) {
    if (!diff) {
      return {}
    }

    const pros = diff.pros && diff.pros.map((pro) => {
      return `+ ${pro.reason}`
    })
    const cons = diff.cons && diff.cons.map((con) => {
      return `- ${con.reason}`
    })

    return {
      pros,
      cons,
    }
  }
}