import FeedbackPhase from "./LandingPage/FeedbackPhase";
import FirstPhase from "./LandingPage/FirstPhase";
import SecondPhase from "./LandingPage/SecondPhase";
import ThirdPhase from "./LandingPage/ThirdPhase";
import ShowFeedbacks from "./ShowFeebacks";

const Home = () => {
  return (
    <div>
        <FirstPhase />
        <SecondPhase />
        <FeedbackPhase />
        <ThirdPhase />
    </div>
  )
}

export default Home
