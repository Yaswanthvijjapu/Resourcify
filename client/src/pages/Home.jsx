import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Resourcify</h1>
          <p className="text-lg mb-6">A smart resource booking and management platform.</p>
          <a href="/login" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Get Started
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;