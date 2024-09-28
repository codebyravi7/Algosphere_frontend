import ContestList from "../components/ContestList";
import Header from "./Header";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Coding Contest Notifier
        </h1>
        <ContestList />
      </div>
    </div>
  );
};

export default HomePage;
