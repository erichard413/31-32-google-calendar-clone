type propTypes = {
  color: string;
  formColor: string;
};

export function ColorInput({ color, formColor }: propTypes) {
  return (
    <>
      <input
        type="radio"
        name="color"
        value={color}
        id={color}
        className="color-radio"
        checked={!!(formColor == color) ? true : false}
      />
      <label htmlFor={color}>
        <span className="sr-only">{`${color[0].toUpperCase()}${color.slice(
          1
        )}`}</span>
      </label>
    </>
  );
}
