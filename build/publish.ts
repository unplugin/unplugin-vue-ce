import { series } from 'gulp'
import { runTask } from './utils'
export default series(
  runTask('publish @unplugin-vue-ce/utils', 'cd dist/utils && pnpm run publish:npm'),
  runTask('publish @unplugin-vue-ce/v-model', 'cd dist/v-model && pnpm run publish:npm'),
  runTask('publish @unplugin-vue-ce/sub-style', 'cd dist/sub-style && pnpm run publish:npm'),
  runTask('publish @unplugin-vue-ce/switch-shadow', 'cd dist/switch-shadow && pnpm run publish:npm'),
  runTask('publish @unplugin-vue-ce/ce-app', 'cd dist/ce-app && pnpm run publish:npm'),
  runTask('publish unplugin-vue-ce', 'cd dist && pnpm run publish:npm'),
)
