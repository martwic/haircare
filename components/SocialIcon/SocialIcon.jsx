import styles from './SocialIcon.module.scss';

export const SocialIcon = ({ href, src, name }) => (
  <a className={styles.wrapper} href={href} target="_blank" rel="noopener noreferrer">
    <img src={src} alt={name} className={styles.icon} />
    {name}
  </a>
);
