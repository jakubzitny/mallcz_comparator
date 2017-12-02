export default class DataUtils {
  static filterDataByPrice(data, sliderValues) {
    const results = data.results;
    const nextResults = results.filter((result) => {
      const product = result['Product']
      if (result['IsBase']) {
        console.log('YAYYYY')
        return true
      }

      const price = Number(product['PRICE_VAT'])
      const valid = (
        Number(sliderValues[0]) <= price &&
        price <= Number(sliderValues[1])
      )

      return valid
    })

    data.results = nextResults;

    return data;
  }
}
