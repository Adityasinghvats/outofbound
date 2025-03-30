

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen py-20">
      <header className="container mx-auto px-4 flex items-center justify-between mb-12">
        <a className="text-2xl font-bold">
          Outofbound
        </a>
        
        
      </header>

      <section className="container mx-auto px-4 text-center mb-24">
        <h1 className="text-5xl font-bold mb-6">
          Unlock the Power of Community Knowledge
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Outofbound is the platform for sharing and discovering solutions to
          your coding challenges. Join our community and level up your skills.
        </p>
        <a
          href="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg"
        >
          Get Started for Free
        </a>
      </section>

      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Ask Questions</h2>
          <p className="text-gray-400">
            Get help from experienced developers in our community.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Share Answers</h2>
          <p className="text-gray-400">
            Showcase your expertise and help others solve their problems.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Level Up</h2>
          <p className="text-gray-400">
            Improve your coding skills and build your reputation.
          </p>
        </div>
      </section>

      <footer className="container mx-auto px-4 text-center text-gray-500">
        <p>&copy; 2025 Outofbound. All rights reserved.</p>
      </footer>
    </div>
  );
}
