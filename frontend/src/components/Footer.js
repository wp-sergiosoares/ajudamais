import { useInfo } from "../context/InfoContext";

const Footer = () => {
  const { info } = useInfo();
  return (
    <footer>
      <p>{info.title}</p>
      <p>{info.description}</p>
    </footer>
  );
};

export default Footer;
