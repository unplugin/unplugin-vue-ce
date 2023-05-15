import { extend } from 'baiwusanyu-utils'
import { DEFAULT_EXCLUDE_REG, DEFAULT_INCLUDE_REG } from '@baiwusanyu/unvuece-utils'
import type { Options } from '../../types'

const defaultOption: Options = {
  include: DEFAULT_INCLUDE_REG,
  exclude: DEFAULT_EXCLUDE_REG,
}

export function initOption(option: Options) {
  option = extend(defaultOption, option)
  return option
}
