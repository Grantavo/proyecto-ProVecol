export const Utils = {
  qs: (selector, parent = document) => parent.querySelector(selector),
  qsa: (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector)),
  addMultipleListeners: (element, events, handler) => {
    events.forEach((event) => element.addEventListener(event, handler));
  },
  debounce: (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },
};
