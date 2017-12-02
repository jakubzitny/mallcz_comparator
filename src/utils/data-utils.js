export default class DataUtils {
  static filterDataByPrice(data, sliderValues) {
    // if (!data || !data.results) {
    //   return null
    // }

    const results = data.results;
    const baseProduct = results.find((result) => {
      return result['IsBase']
    })

    const nextResults = results.filter((result) => {
      const product = result['Product']
      if (result['IsBase']) {
        return true
      }

      const price = Number(product['PRICE_VAT'])
      const score = Number(result['Score'])

      const inRange = (
        Number(sliderValues[0]) <= price &&
        price <= Number(sliderValues[1])
      )

      if (inRange) {
        return true
      }

      // should be always true
      // if (baseProduct) {
      //   const baseProductPrice = Number(baseProduct['Product']['PRICE_VAT'])
      //   const baseProductScore = Number(baseProduct['Score'])
      //   const ratio = (
      //     (price / baseProductPrice)
      //     /
      //     (score / baseProductScore)
      //   )

      //   if (ratio > 1) {
      //     console.log(`${price}/${baseProductPrice} / ${score}/${baseProductScore} ~== ${ratio}`)
      //     return true
      //   }
      // }

      return false
    })

    data.results = nextResults;

    return data;
  }
}
