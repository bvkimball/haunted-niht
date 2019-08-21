import haunted from "haunted/core"
import { html, render, TemplateResult } from "lit-html"
import { css, CSSResult, supportsAdoptingStyleSheets } from "@niht/stylis"

const { component, createContext } = haunted({
  render(what, where) {
    if (Array.isArray(what)) {
      what.forEach(tpl => {
        if (tpl instanceof TemplateResult) {
          render(tpl, where)
        } else if (tpl instanceof CSSResult) {
          if (supportsAdoptingStyleSheets) {
            where.adoptedStyleSheets = [tpl.styleSheet]
          } else {
            console.warn("don't do add css to an element not using shadow dom")
          }
        }
      })
    } else {
      render(what, where)
    }
  },
})

export { html, css, createContext }
export { useCallback, useEffect, useState, useReducer, useMemo, useContext, useRef, hook, Hook } from "haunted/core"
export { repeat } from "lit-html/directives/repeat"
export { until } from "lit-html/directives/until"
export { classMap } from "lit-html/directives/class-map"
export { styleMap } from "lit-html/directives/style-map"
export { guard } from "lit-html/directives/guard"
export { ifDefined } from "lit-html/directives/if-defined"

const restrictedElementProperties = [
  "shadowRoot",
  "accessKey",
  "addEventListener",
  "appendChild",
  "attributes",
  "blur",
  "childElementCount",
  "childNodes",
  "children",
  "classList",
  "className",
  "click",
  "clientHeight",
  "clientLeft",
  "clientTop",
  "clientWidth",
  "cloneNode",
  "compareDocumentPosition",
  "contains",
  "contentEditable",
  "dir",
  "exitFullscreen",
  "firstChild",
  "firstElementChild",
  "focus",
  "getAttribute",
  "getAttributeNode",
  "getBoundingClientRect",
  "getElementsByClassName",
  "getElementsByTagName",
  "hasAttribute",
  "hasAttributes",
  "hasChildNodes",
  "id",
  "innerHTML",
  "innerText",
  "insertAdjacentElement",
  "insertAdjacentHTML",
  "insertAdjacentText",
  "insertBefore",
  "isContentEditable",
  "isDefaultNamespace",
  "isEqualNode",
  "isSameNode",
  "isSupported",
  "lang",
  "lastChild",
  "lastElementChild",
  "namespaceURI",
  "nextSibling",
  "nextElementSibling",
  "nodeName",
  "nodeType",
  "nodeValue",
  "normalize",
  "offsetHeight",
  "offsetWidth",
  "offsetLeft",
  "offsetParent",
  "offsetTop",
  "ownerDocument",
  "parentNode",
  "parentElement",
  "previousSibling",
  "previousElementSibling",
  "querySelector",
  "querySelectorAll",
  "removeAttribute",
  "removeAttributeNode",
  "removeChild",
  "removeEventListener",
  "replaceChild",
  "requestFullscreen",
  "scrollHeight",
  "scrollIntoView",
  "scrollLeft",
  "scrollTop",
  "scrollWidth",
  "setAttribute",
  "setAttributeNode",
  "style",
  "tabIndex",
  "tagName",
  "textContent",
  "title",
  "toString",
]

export function define(name, fn, options) {
  let matches = fn.toString().match(/^[\s\(]*function[^(]*\(\{([^)]*)\}\)/im)
  let attrs = null
  if (matches && matches.length) {
    attrs = matches[1]
      .trim()
      .replace(/:\w/gi, "")
      .split(/\s*,\s*/)
  }
  if (Array.isArray(attrs)) {
    fn.observedAttributes = attrs.filter(a => !restrictedElementProperties.includes(a))
  }
  let cmp = component(fn, options)
  customElements.define(name, cmp)
}
