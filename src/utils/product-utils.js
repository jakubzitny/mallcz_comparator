
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
        base: result['IsBase'],
        y: result['Score'],
        x: resultProduct['PRICE_VAT'],
        id: resultProduct['PRODUCTNO'],
        title: resultProduct['PRODUCTNAME'],
        // TODO: add these from result['ProCons']
        pros: [ '+ adv1', '+ adv2', '+ adv3' ],
        cons: [ '- con1', '- con2', '- con3' ],
        pointBackgroundColor: (result['IsBase']) ? 'red' : 'black',
        pointRadius: (result['IsBase']) ? 6 : 3,
      }
    })
  }
}