// src/components/AboutPage.js
import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-500 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center py-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-gray-950">KNOW</span> <br />
            <span className="text-gray-400">MORE</span> <br />
            <span className="text-white">ABOUT</span> <br />
            <span className="text-white">WRITEON</span>
          </h1>
        </header>
        <section className="text-center mb-12">
          <p className="text-lg md:text-xl">
          Welcome to Witeon, your go-to source for the latest in tech! We are dedicated to providing insightful articles, in-depth tutorials, and the newest updates in the world of technology. Whether you're a developer, a tech enthusiast, or just curious about the latest trends, our blog offers something for everyone. Join us as we explore the ever-evolving tech landscape and share our passion for innovation and knowledge. Stay informed, stay ahead with Witeon!
          </p>
        </section>
        <hr className="border-gray-600 mb-12"/>
        <section className="text-center">
          <h2 className="text-gray-400 uppercase tracking-widest mb-8">Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="bg-gray-800 rounded-full w-12 h-12 mx-auto flex items-center justify-center mb-4">
                <span className="text-gray-400">No. 01</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">International Talent</h3>
              <p className="text-gray-400">
                Multiple backgrounds, personalities, and expertise from all over the world come together to form a tight unit of stellar capabilities.
              </p>
            </div>
            <div>
              <div className="bg-gray-800 rounded-full w-12 h-12 mx-auto flex items-center justify-center mb-4">
                <span className="text-gray-400">No. 02</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Driven by Passion</h3>
              <p className="text-gray-400">
                We love what we do. Our team is always on the lookout for the latest cutting-edge technologies to streamline our clients' projects.
              </p>
            </div>
            <div>
              <div className="bg-gray-800 rounded-full w-12 h-12 mx-auto flex items-center justify-center mb-4">
                <span className="text-gray-400">No. 03</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Part of Your Team</h3>
              <p className="text-gray-400">
                Our team works together with your team to deliver the best possible experience for your users. Teamwork all the way.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
