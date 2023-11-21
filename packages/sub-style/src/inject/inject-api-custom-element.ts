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
  + '      let ceKeyCountMap = /* @__PURE__ */ new Map();\n'
  + '      if (ceChildStyleMap.has(styleContent)) {\n'
  + '        ceKeyCountMap = ceChildStyleMap.get(styleContent);\n'
  + '        if (ceKeyCountMap.has(ceKey)) {\n'
  + '          ceKeyCountMap.set(ceKey, ceKeyCountMap.get(ceKey) + 1);\n'
  + '          ceChildStyleMap.set(styleContent, ceKeyCountMap);\n'
  + '          return;\n'
  + '        }\n'
  + '      }\n'
  + '      ceKeyCountMap.set(ceKey, 1);\n'
  + '      ceChildStyleMap.set(styleContent, ceKeyCountMap);\n'
  // eslint-disable-next-line no-template-curly-in-string
  + '      ceChildStyleUidMap.set(`${styleContent}-${ceKey}`, instance.uid);\n'
  // eslint-disable-next-line no-template-curly-in-string
  + '      const ceStyleId = `data-v-ce-${instance.uid}`;\n'
  + '      styles.forEach((css, index) => {\n'
  + '        const s = document.createElement("style");\n'
  + '        s.textContent = css;\n'
  + '        s.setAttribute(ceStyleId, "");\n'
  + '        if (this._childStylesAnchor) {\n'
  + '          this.shadowRoot.insertBefore(\n'
  + '            s,\n'
  + '            this._childStylesAnchor\n'
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
  + '  _removeChildStyles(styles) {\n'
  + '    if (styles) {\n'
  + '      const styleContent = styles.join();\n'
  + '      let ceKeyCountMap = /* @__PURE__ */ new Map();\n'
  + '      if (ceChildStyleMap.has(styleContent)) {\n'
  // eslint-disable-next-line no-template-curly-in-string
  + '        const ceKey = `__${this._instance.uid}`;\n'
  + '        ceKeyCountMap = ceChildStyleMap.get(styleContent);\n'
  + '        const activeCEs = ceKeyCountMap.get(ceKey) - 1;\n'
  + '        ceKeyCountMap.set(ceKey, ceKeyCountMap.get(ceKey) - 1);\n'
  + '        if (activeCEs === 0) {\n'
  + '         ceKeyCountMap.delete(ceKey);\n'
  + '        } else {\n'
  + '         ceKeyCountMap.set(ceKey, activeCEs);\n'
  + '        }\n'
  + '        if (ceKeyCountMap.size === 0) {\n'
  // eslint-disable-next-line no-template-curly-in-string
  + '          const styleUid = ceChildStyleUidMap.get(`${styleContent}-${ceKey}`);\n'
  // eslint-disable-next-line no-template-curly-in-string
  + '          const sList = this.shadowRoot.querySelectorAll(`[data-v-ce-${styleUid}]`);\n'
  + '          sList.length > 0 && sList.forEach((s) => this.shadowRoot.removeChild(s));\n'
  + '          const archor = this.shadowRoot.querySelectorAll("style");\n'
  + '          this._childStylesAnchor = archor.length > 0 ? archor[archor.length - 1] : void 0;\n'
  + '          ceChildStyleMap.delete(styleContent);\n'
  // eslint-disable-next-line no-template-curly-in-string
  + '          ceChildStyleUidMap.delete(`${styleContent}-${ceKey}`);\n'
  + '        } else {\n'
  + '          ceChildStyleMap.set(styleContent, ceKeyCountMap);\n'
  + '        }\n'
  + '      }\n'
  + '    }\n'
  + '  }'

const injectApplyStyles = '\n    this._childStylesAnchor = s;'
const injectCEChildStyleMap = 'const ceChildStyleMap = /* @__PURE__ */ new Map();\n const ceChildStyleUidMap = /* @__PURE__ */ new Map();\n'
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
