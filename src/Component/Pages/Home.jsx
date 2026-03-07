import TouristCard from "../TouristCard";
import CountrySpots from "../Pages/CountrySpots";
import WhyChooseUs from "../Pages/WhyChooseUs";
import Featured from "../Pages/Featured";
// import CountryCard from "../CountryCard";
const Home = () => {
  return (
    <div>
      <TouristCard />
      <CountrySpots />
      <WhyChooseUs />
     {/* <CountryCard></CountryCard> */}
      <Featured />
    </div>
  );
};

export default Home;