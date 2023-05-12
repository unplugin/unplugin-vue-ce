
import { series } from 'gulp'
import { runTask } from './utils'
export default series(
  runTask('publish @unplugin-vue-ce/vModel', 'cd dist/vModel && pnpm run publish:npm'),
  runTask('publish unplugin-vue-ce', 'cd dist && pnpm run publish:npm'),
)
