import {CSSProperties, ChangeEvent, useState} from "react";
import styles from "./Converter.module.css";

export const Сonverter = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const hexToRgb = (hexStr: string) => {
    const bigint = parseInt(hexStr.slice(1), 16);
    const rgb = {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  };

  const isValidHEX = (value: string) => {
    const regexp = /#[a-f0-9]{6}/gi;
    return regexp.test(value);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {target} = event;
    if (target.value.length === 7) {
      const isValid = isValidHEX(target.value);
      const color = isValid ? hexToRgb(target.value) : "rgb(233, 75, 53)";
      setValue(color);
      setError(isValid ? false : true);
    }
  };

  const bgStyle = {backgroundColor: value} as CSSProperties;

  return (
    <div className={styles.converter} style={bgStyle}>
      <div className={styles["form-wrap"]}>
        <input
          type='text'
          onChange={handleChange}
          maxLength={7}
          className={`${styles.input}`}
        />
        <div className={styles["text-wrap"]}>
          <p className={styles.text}>{error ? "Ошибка!" : value}</p>
        </div>
      </div>
    </div>
  );
};
