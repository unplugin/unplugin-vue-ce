import type { MagicStringBase } from 'magic-string-ast'
import type {
  CallExpression,
  ClassDeclaration,
  ClassMethod,
  Identifier,
  MemberExpression,
  VariableDeclarator,
} from '@babel/types'

const _childStylesAnchor = '\n    this._childStylesAnchor = null;'

const injectBindFnContent
  = 'instance.addCEChildStyle = this._addChildStyles.bind(this);\n'
  + '        instance.removeCEChildStyle = this._removeChildStyles.bind(this);\n        '

const injectAddAndRemoveStyle = '  _addChildStyles( styles, instance ) {\n'
  + '    if (styles) {\n'
  // eslint-disable-next-line no-template-curly-in-string
  + '      const ceStyleId = `data-v-ce-${instance.uid}`;\n'
  + '      styles.forEach((css, index) => {\n'
  + '        const s = document.createElement(\'style\');\n'
  + '        s.textContent = css;\n'
  + '        (instance.cecStyleIds || (instance.cecStyleIds = new Set())).add(\n'
  + '          ceStyleId\n'
  + '        );\n'
  + '        s.setAttribute(ceStyleId, \'\');\n'
  + '\n'
  + '        if (this._childStylesAnchor) {\n'
  + '          this.shadowRoot.insertBefore(\n'
  + '            s,\n'
  + '            this._childStylesAnchor.nextSibling\n'
  + '          );\n'
  + '        } else {\n'
  + '          this.shadowRoot.appendChild(s);\n'
  + '        }\n'
  + '        // update anchor\n'
  + '        this._childStylesAnchor = s;\n'
  + '\n'
  + '        // record for HMR\n'
  + '        {\n'
  + '          ;(this._styles || (this._styles = [])).push(s)\n'
  + '        }\n'
  + '      })\n'
  + '    }\n'
  + '  }\n'
  + '\n'
  + '  _removeChildStyles(cecStyleIds) {\n'
  + '    if (cecStyleIds) {\n'
  + '      cecStyleIds.forEach(id => {\n'
  // eslint-disable-next-line no-template-curly-in-string
  + '        const sList = this.shadowRoot.querySelectorAll(`[${id}]`);\n'
  + '        sList.length > 0 && sList.forEach(s => this.shadowRoot.removeChild(s));\n'
  + '      });\n'
  + '      const archor = this.shadowRoot.querySelectorAll(\'style\');\n'
  + '      this._childStylesAnchor =\n'
  + '        archor.length > 0 ? archor[archor.length - 1] : undefined;\n'
  + '    }\n'
  + '  }\n'

const injectApplyStyles = '\n    this._childStylesAnchor = s;'

let isVueElementIdentifier = false
let isBaseClassIdentifier = false
let isApplyStylesIdentifier = false
export function injectApiCustomElement(
  mgcStr: MagicStringBase,
  node: Identifier | CallExpression | MemberExpression,
  parent: VariableDeclarator | CallExpression | ClassDeclaration | ClassMethod,
) {
  if (node.type === 'Identifier'
    && node.name === 'VueElement'
    && parent.type === 'ClassDeclaration')
    isVueElementIdentifier = true

  if (node.type === 'Identifier'
    && node.name === 'BaseClass'
    && isVueElementIdentifier)
    isBaseClassIdentifier = true

  if (node.type === 'CallExpression'
    && isVueElementIdentifier
    && isBaseClassIdentifier
    && node.callee.type === 'Super')
    mgcStr.prependRight(node.end! + 1, _childStylesAnchor)

  if (node.type === 'MemberExpression'
    && isVueElementIdentifier
    && isBaseClassIdentifier
    && (node.object as Identifier).name === 'instance'
    && (node.property as Identifier).name === 'isCE')
    mgcStr.prependLeft(node.start!, injectBindFnContent)

  if (node.type === 'Identifier'
    && node.name === '_applyStyles'
    && parent.type === 'ClassMethod'
    && isVueElementIdentifier
    && isBaseClassIdentifier) {
    isApplyStylesIdentifier = true
    mgcStr.prependLeft(parent.end! + 1, injectAddAndRemoveStyle)
  }

  if (isApplyStylesIdentifier
    && isVueElementIdentifier
    && isBaseClassIdentifier
    && node.type === 'CallExpression'
    && node.callee.type === 'MemberExpression'
    && (node.callee.property as Identifier).name === 'appendChild'
    && ((node.callee.object as MemberExpression).property as Identifier).name === 'shadowRoot') {
    isApplyStylesIdentifier = false
    isVueElementIdentifier = false
    isBaseClassIdentifier = false
    mgcStr.prependRight(node.end! + 1, injectApplyStyles)
  }
}
