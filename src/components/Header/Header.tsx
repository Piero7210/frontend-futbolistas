import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Futbolistas</h1>
      <div>
        <img
          src="https://static.vecteezy.com/system/resources/previews/009/000/164/large_2x/banner-of-soccer-ball-with-green-soccer-field-vector.jpg"
          alt="Balón de fútbol"
          className={styles.image}
        />
      </div>
    </div>
  );
}
