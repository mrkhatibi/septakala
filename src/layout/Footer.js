import styles from "./Footer.module.css";
import Image from "next/image";
import icon from "../../public/icon.png";

function Footer() {
  return (
    <div className={styles.footer}>
      <Image src={icon} alt="icon" width={190} height={100} priority />
      <h2>Developed By MrKhatibi</h2>
    </div>
  );
}

export default Footer;
