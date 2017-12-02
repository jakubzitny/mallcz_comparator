
export default class ProductUtils {
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

  static getSimilarProducts(data) {
    return data.results
      .filter((result) => {
        return !result['IsBase']
      })
  }

  static getChartData(data) {
    return data.results.map((result) => {
      const resultProduct = result['Product']

      return {
        y: result['Score'],
        x: resultProduct['PRICE_VAT'],
        id: resultProduct['PRODUCTNO'],
      }
    })
  }
}