function Icon({ id, ...props }) {
  return (
    <svg {...props} width="32" height="32">
      <use href={`/sprites.svg#${id}`} />
    </svg>
  );
}

export default Icon;
