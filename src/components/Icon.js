function Icon({ id, ...props }) {
  return (
    <svg {...props} width="32" height="32" style={{ fill: "currentcolor" }}>
      <use href={`/sprites.svg#${id}`} />
    </svg>
  );
}

export default Icon;
