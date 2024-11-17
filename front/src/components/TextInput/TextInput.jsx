import styles from "./TextInput.module.css";


function TextInput({ label, value, onChange }) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
}



export default TextInput;