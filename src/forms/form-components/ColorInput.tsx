type propTypes = {
  color: string;
  formColor: string;
  handleChange: any;
};

export function ColorInput({ color, formColor, handleChange }: propTypes) {
  return (
    <>
      <input
        type="radio"
        name="color"
        value={color}
        id={color}
        onChange={handleChange}
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
