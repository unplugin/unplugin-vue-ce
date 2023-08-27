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

const injectAddAndRemoveStyle = '_addChildStyles(styles, instance) {\n'
  + '    if (styles) {\n'
  + '      const styleContent = styles.join();\n'
  // eslint-disable-next-line no-template-curly-in-string
  + '      const ceKey = `__${this._instance.uid}`;\n'
  + '      let ceKeySet = /* @__PURE__ */ new Set();\n'
  + '      if (ceChildStyleMap.has(styleContent)) {\n'
  + '        ceKeySet = ceChildStyleMap.get(styleContent);\n'
  + '        if (ceKeySet.has(ceKey)) {\n'
  + '          ceKeySet.add(ceKey);\n'
  + '          ceChildStyleMap.set(styleContent, ceKeySet);\n'
  + '          return;\n'
  + '        }\n'
  + '      }\n'
  + '      ceKeySet.add(ceKey);\n'
  + '      ceChildStyleMap.set(styleContent, ceKeySet);\n'
  // eslint-disable-next-line no-template-curly-in-string
  + '      const ceStyleId = `data-v-ce-${instance.uid}`;\n'
  + '      styles.forEach((css, index) => {\n'
  + '        const s = document.createElement("style");\n'
  + '        s.textContent = css;\n'
  + '        s.setAttribute(ceStyleId, "");\n'
  + '        if (this._childStylesAnchor) {\n'
  + '          this.shadowRoot.insertBefore(\n'
  + '            s,\n'
  + '            this._childStylesAnchor.nextSibling\n'
  + '          );\n'
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
  + '  _removeChildStyles(styles, uid) {\n'
  + '    if (styles) {\n'
  + '      const styleContent = styles.join();\n'
  + '      let cecStyle = /* @__PURE__ */ new Set();\n'
  + '      if (ceChildStyleMap.has(styleContent)) {\n'
  // eslint-disable-next-line no-template-curly-in-string
  + '        const ceKey = `__${this._instance.uid}`;\n'
  + '        cecStyle = ceChildStyleMap.get(styleContent);\n'
  + '        cecStyle.delete(ceKey);\n'
  + '        if (cecStyle.size === 0) {\n'
  // eslint-disable-next-line no-template-curly-in-string
  + '          const sList = this.shadowRoot.querySelectorAll(`[data-v-ce-${uid}]`);\n'
  + '          sList.length > 0 && sList.forEach((s) => this.shadowRoot.removeChild(s));\n'
  + '          const archor = this.shadowRoot.querySelectorAll("style");\n'
  + '          this._childStylesAnchor = archor.length > 0 ? archor[archor.length - 1] : void 0;\n'
  + '          ceChildStyleMap.delete(styleContent);\n'
  + '        } else {\n'
  + '          ceChildStyleMap.set(styleContent, cecStyle);\n'
  + '        }\n'
  + '      }\n'
  + '    }\n'
  + '  }'

const injectApplyStyles = '\n    this._childStylesAnchor = s;'
const injectCEChildStyleMap = 'const ceChildStyleMap = /* @__PURE__ */ new Map();\n'
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
    mgcStr.prependRight(node.end! + 1, injectApplyStyles)
    mgcStr.prependLeft(0, injectCEChildStyleMap)
  }
}
