import { SocialIcon } from '@/components/SocialIcon';
import styles from '/styles/aboutUs.module.scss';
import { Person } from '@/components/Person';

export default function Home({ data }) {
  return (
    <div className="bodyLog">
      <div className="mainLog" styles={{ width: "unset" }}>
        <div className={styles.wrapper}>
          <div className={styles.imageContainer}>
            <Person img="/images/julia.jpg" name="Julia" />
            <Person img="/images/marta2.jpg" name="Marta" />
            <Person img="/images/marta.jpg" name="Marta" />
            <Person img="/images/natalia.jpg" name="Natalia" />
            <Person img="/images/ola.jpg" name="Ola" />
          </div>
          <div className={styles.contentCard}>
            Jesteśmy grupą dziewczyn, które uwielbiają dbać o swoje włosy i chcą pomóc innym w
            osiągnięciu najlepszego efektu pielęgnacji.
            <br /><br />
            Nasza strona HairCare oferuje spersonalizowane porady dotyczące pielęgnacji włosów, które pomogą Ci znaleźć
            kosmetyki najlepiej dopasowane do Twojego konkretnego przypadku. Nie jesteśmy związane
            z żadną konkretną marką kosmetyków - kierujemy się wyłącznie składem i działaniem
            produktów, aby móc polecić Wam najlepsze rozwiązania dla Waszych włosów. Jesteśmy
            przekonane, że każda osoba zasługuje na zdrowe i piękne włosy. Dlatego stworzyłyśmy
            HairCare - aby pomóc Ci w osiągnięciu tego celu. Nasza metoda działania jest prosta:
            wypełnij ankietę dotyczącą Twoich włosów, a my przygotujemy spersonalizowaną listę
            kosmetyków, które najlepiej dopasują się do Twojego typu włosów i potrzeb
            pielęgnacyjnych.
            <br /><br />
            Dzięki temu oszczędzisz czas i pieniądze, unikając próbowania wielu
            różnych produktów, zanim znajdziesz ten idealny. Naszą misją jest pomaganie innym w
            pielęgnacji włosów i dzielenie się naszą wiedzą oraz doświadczeniem. Zapraszamy do
            śledzenia naszych porad na stronie internetowej oraz w mediach społecznościowych.
            Jeśli masz pytania lub potrzebujesz porady, skontaktuj się z nami - chętnie pomożemy!
          </div>
          <div className={styles.socialWrapper}>
            <SocialIcon
              href="https://www.instagram.com"
              src="/images/instagram_icon.png"
              name="Instagram"
            />
            <SocialIcon href="https://tiktok.com" src="/images/tiktok_icon.png" name="TikTok" />
            <SocialIcon
              href="https://www.youtube.com"
              src="/images/youtube_icon.png"
              name="YouTube"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
