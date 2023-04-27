import React from "react";
import reactDom from "react-dom";
import PropTypes from "prop-types";

function Portal({ children, wrapperId = "react-portal-id" }) {
  const [wrapperElement, setWrapperElement] = React.useState(null);
  let systemCreated = false;

  React.useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);

    if (!element) {
      // eslint-disable-next-line
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }

    setWrapperElement(element);

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return reactDom.createPortal(children, wrapperElement);
}

function createWrapperAndAppendToBody(wrapperId) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

Portal.propTypes = {
  children: PropTypes.node,
  wrapperId: PropTypes.string,
};

export default Portal;
