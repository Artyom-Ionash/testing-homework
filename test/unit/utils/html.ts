const isHTMLElement = (element: Element | null): element is HTMLElement =>
  element instanceof HTMLElement;

export const selectElementOrEmpty = (
  element: HTMLElement,
  selectors: string
) => {
  const selected = element.querySelector(selectors);
  if (isHTMLElement(selected)) return selected;
  return document.createElement("div");
};
