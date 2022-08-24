import { withPrefix } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";

const Navigation = () => (
  <ul className="flex items-center space-x-2 text-sm font-medium text-gray-500">
    <li className="hidden lg:block">
      <a className="px-3 py-2 rounded-lg" href="/">
        {" "}
        Home{" "}
      </a>
    </li>
    <li>
      <a className="px-3 py-2 rounded-lg" href="">
        {" "}
        Contact{" "}
      </a>
    </li>
  </ul>
);

const Hero = () => (
  <aside
    className="overflow-hidden bg-no-repeat bg-cover bg-top flex justify-center"
    style={{ backgroundImage: `url(${withPrefix("/images/heroback.jpeg")})` }}
  >
    <div className="p-16 md:p-12 lg:px-16 lg:py-24  bg-blue-400/50 w-full justify-center">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl uppercase text-center">
          This is Inorm
        </h2>

        <p className="hidden text-white/90 md:mt-6 md:text-lg md:leading-relaxed md:block text-center">
          Inorm is a valuable addition for your team or project
        </p>

        <div className="mt-4 sm:mt-8 text-center">
          <a
            className="inline-flex items-center px-8 py-3 text-white transition bg-blue-500 rounded-lg focus:outline-none focus:ring focus:ring-yellow-400 hover:bg-gray-800"
            href="#"
          >
            <span className="text-sm font-medium"> Contact us! </span>

            <svg
              className="w-5 h-5 ml-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </aside>
);

const Services = () => (
  <section className="text-black bg-gray-100">
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className=" mx-auto text-center">
        <h2 className="text-3xl font-bold sm:text-4xl uppercase">
          what we do?
        </h2>

        <p className="mt-4 text-black-300 uppercase">
          We provide skilled developers from anywhere on this planet
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2">
        <div className="flex flex-col items-center p-8 transition border bg-white border-blue-300 shadow-xl rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10">
          <div className="h-24 w-24 grid shrink-0 place-content-center rounded-full border-2 border-blue-500">
            <div className="h-20 w-20 grid shrink-0 place-content-center rounded-full bg-blue-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
          </div>

          <h3 className="mt-4 text-xl font-bold">Dedicated Teams</h3>

          <p className="mt-1 text-sm text-black-300 text-center">
            An outsourced team manages a portion of the development project and
            is overseen by Inorm's Project Manager.
          </p>
        </div>

        <div className="flex flex-col items-center p-8 transition border bg-white border-blue-300 shadow-xl rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10">
          <div className="h-24 w-24 grid shrink-0 place-content-center rounded-full border-2 border-blue-500">
            <div className="h-20 w-20 grid shrink-0 place-content-center rounded-full bg-blue-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            </div>
          </div>

          <h3 className="mt-4 text-xl font-bold">Staff Augmentation</h3>

          <p className="mt-1 text-sm text-black-300 text-center">
            If you ran out of quality IT talent, or can't find any experienced
            professional. Choose Inorm as a Staff Augmentation partner!
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Homepage = () => {
  return (
    <Layout header={<Navigation />}>
      <Hero />
      <Services />
    </Layout>
  );
};

export default Homepage;
