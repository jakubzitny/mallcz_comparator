export default class DataUtils {
  static filterDataByPrice(data, sliderValues) {
    const results = data.results;
    results.filter((result) => sliderValues[0] <= result['Product']['PRICE_VAT'] <= sliderValues[1]);
    data.results = results;

    return data;
  }
}
