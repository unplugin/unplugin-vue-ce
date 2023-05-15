
import { series } from 'gulp'
import { runTask } from './utils'
export default series(
  runTask('publish @baiwusanyu/unvuece-utils', 'cd dist/utils && pnpm run publish:npm'),
  runTask('publish @baiwusanyu/unvuece-v-model', 'cd dist/v-model && pnpm run publish:npm'),
  runTask('publish unplugin-vue-ce', 'cd dist && pnpm run publish:npm'),
)
