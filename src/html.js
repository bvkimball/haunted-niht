import { TemplateResult, AttributeCommitter, BooleanAttributePart, EventPart, NodePart, PropertyCommitter, render } from "lit-html"

/**
 * Creates Parts when a template is instantiated.
 */
class CustomTemplateProcessor {
  /**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0]
    if (prefix === ":") {
      const committer = new PropertyCommitter(element, name.slice(1), strings)
      return committer.parts
    }
    if (prefix === "@") {
      return [new EventPart(element, name.slice(1), options.eventContext)]
    }
    if (prefix === "?") {
      return [new BooleanAttributePart(element, name.slice(1), strings)]
    }
    const committer = new AttributeCommitter(element, name, strings)
    return committer.parts
  }
  /**
   * Create parts for a text-position binding.
   * @param templateFactory
   */
  handleTextExpression(options) {
    return new NodePart(options)
  }
}

const customTemplateProcessor = new CustomTemplateProcessor()

class TemplateRenderer {
  constructor(tmpl) {
    this.tmpl = tmpl
  }
  render(el) {
    render(this.tmpl, el)
  }
}

const tmplFromTemplateRenderer = value => {
  if (Array.isArray(value)) {
    return value.map(v => tmplFromTemplateRenderer(v))
  }
  if (value instanceof TemplateRenderer) {
    return value.tmpl
  }
  return value
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => {
  let tmpl = new TemplateResult(strings, values.map(v => tmplFromTemplateRenderer(v)), "html", customTemplateProcessor)
  return new TemplateRenderer(tmpl)
}

export { html, render, TemplateResult }
