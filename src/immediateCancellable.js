
import waitCancellable from './waitCancellable'

/**
 * A function returning a promise that will be resolved on the next tick of the event loop.
 *
 * This function returns both a promise and cancel function in order to cancel the wait time if
 * necessary. If cancelled, the promise will be rejected with a CancelledError.
 *
 * This function simply uses setTimeout() internally as it's the most portable solution.
 *
 * @returns {Array} A tuple of two objects:
 *   * The promise
 *   * The cancel function. It will return a boolean that will be true if the promise was effectively cancelled,
 *     false otherwise.
 */
export default function immediateCancellable () {
  return waitCancellable(0)
}
