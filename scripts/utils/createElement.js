/**
 * 
 * @param {Object} target - the object to assign the element to (eg, "this")
 * @param {string} varName - the property name to assign the element to.
 * @param {string} elementName - the tag name of the element to create
 * @returns {HTMLElement} - the newly created HTML element
 */

export function create(target, varName, elementName) {
  const el = document.createElement(elementName);
  target[varName] = el;
  return el;
}