
import { expect, test } from '@jest/globals'
import findIndexLimit from './findIndexLimit'
import _ from 'lodash'
import waitPrecise from './waitPrecise'

test('findIndexLimit compatibility', async () => {
  let res = await findIndexLimit(_.range(3), async (v) => {
    await waitPrecise(10)
    return v === 2
  }, 1)
  expect(res).toBe(_.range(3).findIndex((v) => v === 2))

  res = await findIndexLimit(_.range(3), async (v) => {
    await waitPrecise(10)
    return v === 5
  }, 1)
  expect(res).toBe(_.range(3).findIndex((v) => v === 5))

  res = await findIndexLimit([], async (v) => {
    await waitPrecise(10)
    return v === 5
  }, 1)
  expect(res).toBe([].findIndex((v) => v === 5))
})

test('findIndexLimit cancelSubsequent', async () => {
  const callCount = {}
  _.range(3).forEach((i) => { callCount[i] = 0 })
  const res = await findIndexLimit(_.range(3), async (v, i) => {
    callCount[i] += 1
    await waitPrecise(10)
    return v === 0
  }, 1)
  expect(res).toBe(0)
  expect(callCount[0]).toBe(1)
  expect(callCount[1]).toBe(0)
  expect(callCount[2]).toBe(0)
})

test('findIndexLimit find first in time', async () => {
  const arr = [0, 1, 0]
  let res = await findIndexLimit(arr, async (v, index) => {
    if (index === 0) {
      await waitPrecise(10)
    } else {
      await waitPrecise(100)
    }
    return v === 0
  }, 3)
  expect(res).toBe(0)

  res = await findIndexLimit(arr, async (v, index) => {
    if (index === 0) {
      await waitPrecise(100)
    } else {
      await waitPrecise(10)
    }
    return v === 0
  }, 3)
  expect(res).toBe(2)
})

test('findIndexLimit error', async () => {
  const arr = [0, 1, 2]
  try {
    await findIndexLimit(arr, async (v, index) => {
      if (index === 1) {
        throw new Error('test')
      } else {
        await waitPrecise(100)
      }
      return v === 2
    }, 3)
    expect(false).toBe(true)
  } catch (e) {
    expect(e.message).toBe('test')
  }
})
