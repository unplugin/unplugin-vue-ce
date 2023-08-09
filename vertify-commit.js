import { readFileSync } from 'fs'
import path from 'path'
import color from 'ansi-colors'

const msgPath = path.resolve('.git/COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8').trim()

const commitRE
    = /^(revert: )?(update|optimizate|feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.error(
        `  ${color.bgRed.white(' ERROR ')} ${color.red(
            'invalid commit message format.',
        )}\n\n${
            color.red(
                '  Proper commit message format is required for automated changelog generation. Examples:\n\n',
            )
        }    ${color.green('feat: add \'comments\' option')}\n`
        + `    ${color.green(
            'fix: handle events on blur',
        )}`,
  )
  process.exit(1)
}
