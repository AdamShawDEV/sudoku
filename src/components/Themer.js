import { useEffect, useRef } from "react";

function Themer({ children, variables }) {
  const node = useRef();

  useEffect(() => {
    updateCSSVariables();
    // eslint-disable-next-line
  }, [variables]);

  function updateCSSVariables() {
    Object.entries(variables).forEach(([prop, value]) =>
      node.current.style.setProperty(prop, value)
    );
  }

  return (
    <div ref={node} style={{ height: "100%" }}>
      {children}
    </div>
  );
}

export default Themer;
