
import reduce from './reduce'

/**
 * Performs a reduce operation as defined in the Array.reduceRight() method but using an asynchronous
 * function as reducer. The reducer will be called sequentially.
 *
 * @param {Iterable} iterable An iterable object.
 * @param {Function} reducer The reducer function. It will be called with four arguments:
 *   * accumulator: The last calculated value (or the first value of the iterable if no initial value is provided)
 *   * value: The current value
 *   * index: The current index in the iterable. Will start from the last index if no initial value is provided,
 *     the last index minus 1 otherwise.
 *   * iterable: The iterable on which the reduce operation is performed.
 * @param {*} initial The initial value that will be used as accumulator in the first call to
 *   reducer. If omitted the first element of the iterable will be used as accumulator and reducer
 *   will only be called from from the second element of the list (as defined in the Array.reduce()
 *   function).
 * @returns {Promise} A promise that will be resolved with the result of the reduce operation,
 *   or rejected if any of the calls to reducer throws an exception.
 */
export default async function reduceRight (iterable, reducer, initial = undefined) {
  const arr = Array.from(iterable)
  arr.reverse()
  return reduce(arr, (accumulator, value, index, iterable) => {
    return reducer(accumulator, value, arr.length - 1 - index, iterable)
  }, initial)
}