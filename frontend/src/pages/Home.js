import HomeComoFunciona from "../components/HomeComoFunciona";
import HomeHero from "../components/HomeHero";
import HomeUltimosPedidos from "../components/HomeUltimosPedidos";

const Home = () => {
  return (
    <div className="pages-wrapper">
      <HomeHero />

      <HomeComoFunciona />

      {/* <HomeUltimosPedidos /> */}
    </div>
  );
};

export default Home;
