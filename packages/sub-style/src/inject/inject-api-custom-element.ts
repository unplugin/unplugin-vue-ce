import type { MagicStringBase } from 'magic-string-ast'
import type {
  BlockStatement,
  CallExpression,
  ClassDeclaration,
  ClassMethod,
  Identifier,
  IfStatement,
  MemberExpression,
  VariableDeclarator,
} from '@babel/types'

const _childStylesAnchor = '\n    this._childStylesAnchor = null;\n    this._childStylesSet = new Set();'

const injectBindFnContent
  = ' instance.ceContext = {\n'
  + '          addCEChildStyle: this._addChildStyles.bind(this),\n'
  + '          removeCEChildStyles: this._removeChildStyles.bind(this),\n'
  + '        };\n'

const injectAddAndRemoveStyle = '// The method used by custom element child components\n'
  + '  // to add styles to the shadow dom\n'
  + '  _addChildStyles(styles, uid, hasAttr) {\n'
  + '    if (styles) {\n'
  + '      const isRepeated = this.isHasChildStyle(styles);\n'
  + '      if (isRepeated && !hasAttr)\n'
  + '        return;\n'
  + '      styles.forEach((css, index) => {\n'
  + '        const s = document.createElement("style");\n'
  + '        s.textContent = css;\n'
  // eslint-disable-next-line no-template-curly-in-string
  + '        s.setAttribute(`data-v-ce-${uid}`, "");\n'
  + '        if (this._childStylesAnchor) {\n'
  + '          this.shadowRoot.insertBefore(s, this._childStylesAnchor);\n'
  + '        } else {\n'
  + '          this.shadowRoot.appendChild(s);\n'
  + '        }\n'
  + '        this._childStylesAnchor = s;\n'
  + '        {\n'
  + '          (this._styles || (this._styles = [])).push(s);\n'
  + '        }\n'
  + '      });\n'
  + '    }\n'
  + '  }\n'
  + '  _removeChildStyles(uid) {\n'
  + '    {\n'
  // eslint-disable-next-line no-template-curly-in-string
  + '      const styleList = this.shadowRoot.querySelectorAll(`[data-v-ce-${uid}]`);\n'
  + '      let oldStyleContentList = [];\n'
  + '      styleList.length > 0 && styleList.forEach((s) => {\n'
  + '        oldStyleContentList.unshift(s.innerHTML);\n'
  + '        this.shadowRoot.removeChild(s);\n'
  + '        const anchor = this.shadowRoot.querySelectorAll("style");\n'
  + '        this._childStylesAnchor = anchor.length > 0 ? anchor[anchor.length - 1] : void 0;\n'
  + '      });\n'
  + '      this._childStylesSet.delete(oldStyleContentList.join());\n'
  + '    }\n'
  + '  }\n'
  + '  isHasChildStyle(styles) {\n'
  + '    if (styles) {\n'
  + '      const styleContent = styles.join();\n'
  + '      if (this._childStylesSet.has(styleContent)) {\n'
  + '        return true;\n'
  + '      }\n'
  + '      this._childStylesSet.add(styleContent);\n'
  + '      return false;\n'
  + '    }\n'
  + '  }'

const injectApplyStyles = '\n    this._childStylesAnchor = s;'
const injectApplyStylesCERoot = '\n    s.setAttribute(`data-v-ce-root`, \'\')\n'
let isVueElementIdentifier = false
let isBaseClassIdentifier = false
let isApplyStylesIdentifier = false
let isCeReloadIdentifier = false
let isCreateVnodeIdentifier = false
const injectCreateVNode = '\nthis._childStylesSet.clear();\n'
export function injectApiCustomElement(
  mgcStr: MagicStringBase,
  node: Identifier | CallExpression | MemberExpression | IfStatement | BlockStatement,
  parent: VariableDeclarator | CallExpression | ClassDeclaration | ClassMethod | IfStatement | MemberExpression,
) {
  if (node.type === 'Identifier'
    && node.name === 'VueElement'
      && parent
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
      && parent
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
    mgcStr.prependLeft(node.start! - 1, injectApplyStylesCERoot)
    mgcStr.prependRight(node.end! + 1, injectApplyStyles)
  }

  if (node.type === 'Identifier'
    && node.name === '_createVNode'
    && parent
    && parent.type === 'ClassMethod'
    && isVueElementIdentifier
    && isBaseClassIdentifier)
    isCreateVnodeIdentifier = true

  if (node.type === 'Identifier'
    && node.name === 'ceReload'
    && parent
    && parent.type === 'MemberExpression'
    && isCreateVnodeIdentifier
    && isVueElementIdentifier
    && isBaseClassIdentifier)
    isCeReloadIdentifier = true

  if (isCeReloadIdentifier
    && isVueElementIdentifier
    && isCreateVnodeIdentifier
    && isBaseClassIdentifier
    && node.type === 'BlockStatement'
    && parent
    && parent.type === 'IfStatement') {
    isCeReloadIdentifier = false
    isCreateVnodeIdentifier = false
    mgcStr.prependRight(node.end! + 1, injectCreateVNode)
  }
}
