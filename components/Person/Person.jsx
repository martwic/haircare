import styles from './Person.module.scss';

export const Person = ({ img, name }) => (
  <div className={styles.wrapper}>
    <img src={img} alt={name} className={styles.img} />
    <p>{name}</p>
  </div>
);
