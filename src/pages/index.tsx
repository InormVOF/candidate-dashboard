import { withPrefix } from "gatsby";
import * as React from "react";
import { useState } from "react";
import Layout from "../components/Layout";

const Navigation = () => (
  <ul className="flex items-center space-x-2 text-sm font-medium text-gray-500">
    <li>
      <a className="px-3 py-2 rounded-lg" href="#contact">
        {" "}
        Contact{" "}
      </a>
    </li>
  </ul>
);

const Hero = () => (
  <aside
    className="overflow-hidden bg-no-repeat bg-cover bg-center flex justify-center"
    style={{ backgroundImage: `url(${withPrefix("/images/heroback.jpeg")})` }}
  >
    <div className="p-16 md:p-12 lg:px-16 lg:py-24  bg-black/50 w-full justify-center">
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
            href="#contact"
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
  <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
    <div className=" mx-auto text-center">
      <h2 className="text-3xl font-bold sm:text-4xl uppercase">what we do?</h2>

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
          An outsourced team manages a portion of the development project and is
          overseen by Inorm's Project Manager.
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
);

const ContactForm = () => {
  const [form, setForm] = useState({
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("message", form.message);
    const respoonse = await fetch("api/contact", {
      body: formData,
      method: "post",
    });
    const response = await respoonse.json();
    if (response.result === "OK") {
      setSent(true);
    } else {
      setError(true);
    }
  };

  return (
    <section className="relative flex flex-wrap lg:items-center max-w-screen-xl p-4 mx-auto">
      <div className="w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        {!sent && (
          <>
            <div className="max-w-lg mx-auto text-center">
              <h1 className="text-2xl font-bold sm:text-3xl">Contact us!</h1>

              <p className="mt-4 text-gray-500">
                Having over 20 years experience in Web Development we are able
                to distinguish which developer is the perfect fit for a project.
                We are working with a large pool of pre-screened developers from
                all over the planet.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto mt-8 mb-0 space-y-4"
            >
              {error && (
                <div className="alert alert-error shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      Error! Submission failed. Did you fill everything
                      correctly?
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>

                <div className="relative">
                  <input
                    type="email"
                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      setError(false);
                    }}
                  />

                  <span className="absolute inset-y-0 inline-flex items-center right-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                    placeholder="Message"
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value });
                      setError(false);
                    }}
                  >
                    {form.message}
                  </textarea>
                </div>
              </div>

              <div className="flex items-end justify-end">
                <button
                  type="submit"
                  className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
                >
                  Send
                </button>
              </div>
            </form>
          </>
        )}
        {sent && (
          <div className="alert alert-success shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Your submission has been received!</span>
            </div>
          </div>
        )}
      </div>

      <div className="relative w-full h-64 sm:h-96 lg:w-1/2">
        <img
          className="absolute inset-0 object-cover w-full h-full"
          src="https://www.hyperui.dev/photos/team-1.jpeg"
          alt=""
        />
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900">
    <div className="max-w-5xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="flex justify-center text-teal-300">
        <svg
          width="153"
          height="179"
          viewBox="0 0 153 179"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M153 76.5C153 118.75 118.75 153 76.5 153C34.2502 153 0 118.75 0 76.5C0 34.2502 34.2502 0 76.5 0C118.75 0 153 34.2502 153 76.5Z"
            fill="#AEDDF1"
          />
          <path
            d="M139 77C139 111.242 111.242 139 77 139C42.7583 139 15 111.242 15 77C15 42.7583 42.7583 15 77 15C111.242 15 139 42.7583 139 77Z"
            fill="white"
          />
          <path
            d="M130 77.5C130 106.495 106.495 130 77.5 130C48.5051 130 25 106.495 25 77.5C25 48.5051 48.5051 25 77.5 25C106.495 25 130 48.5051 130 77.5Z"
            fill="#AEDDF1"
          />
          <path
            d="M114 79C114 99.4345 97.4345 116 77 116C56.5655 116 40 99.4345 40 79C40 58.5655 56.5655 42 77 42C97.4345 42 114 58.5655 114 79Z"
            fill="white"
          />
          <circle cx="77" cy="79" r="28" fill="#AEDDF1" />
          <path
            d="M85.7129 92.3262V153H69.626V92.3262H85.7129ZM85.7129 70.4502V85.0898H69.626V70.4502H85.7129Z"
            fill="#003D5C"
          />
        </svg>
      </div>

      {/* <p className="max-w-md mx-auto mt-6 leading-relaxed text-center text-gray-400">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
        consequuntur amet culpa cum itaque neque.
      </p> */}

      {/* <nav className="mt-12" aria-labelledby="footer-navigation">
        <h2 className="sr-only" id="footer-navigation">
          Footer navigation
        </h2>

        <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <a className="text-white transition hover:text-white/75" href="/">
              About
            </a>
          </li>

          <li>
            <a className="text-white transition hover:text-white/75" href="/">
              Careers
            </a>
          </li>

          <li>
            <a className="text-white transition hover:text-white/75" href="/">
              History
            </a>
          </li>

          <li>
            <a className="text-white transition hover:text-white/75" href="/">
              Services
            </a>
          </li>

          <li>
            <a className="text-white transition hover:text-white/75" href="/">
              Projects
            </a>
          </li>

          <li>
            <a className="text-white transition hover:text-white/75" href="/">
              Blog
            </a>
          </li>
        </ul>
      </nav> */}

      <ul className="flex justify-center gap-6 mt-12 md:gap-8">
        <li>
          <a
            href="https://www.linkedin.com/company/inorm/"
            rel="noopener noreferrer"
            target="_blank"
            className="text-white transition hover:text-white/75"
          >
            <span className="sr-only">LinkedIn</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="26"
              height="26"
              viewBox="0 0 192 192"
            >
              {
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                >
                  <path d="M0,192v-192h192v192z" fill="none"></path>
                  <g fill="#ffffff">
                    <g id="surface1">
                      <path d="M156,0h-120c-19.875,0 -36,16.125 -36,36v120c0,19.875 16.125,36 36,36h120c19.875,0 36,-16.125 36,-36v-120c0,-19.875 -16.125,-36 -36,-36zM59.36539,162.98077h-29.82693l-0.17307,-89.30769h29.82692zM43.70192,61.99038h-0.17308c-9.75,0 -16.03846,-6.72115 -16.03846,-15.08653c0,-8.56731 6.49039,-15.0577 16.41347,-15.0577c9.92308,0 16.00961,6.49038 16.21153,15.0577c0,8.36538 -6.31731,15.08653 -16.41346,15.08653zM162.77885,162.98077h-30.08654v-48.51923c0,-11.74039 -3.11538,-19.73077 -13.61538,-19.73077c-8.01923,0 -12.34615,5.39423 -14.42308,10.61538c-0.77885,1.875 -0.98077,4.44231 -0.98077,7.06731v50.56731h-30.23077l-0.17308,-89.30769h30.23077l0.17308,12.60577c3.86538,-5.97116 10.29808,-14.42308 25.70192,-14.42308c19.09616,0 33.37501,12.46154 33.37501,39.25961v51.86539z"></path>
                    </g>
                  </g>
                </g>
              }
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </footer>
);

const Homepage = () => {
  return (
    <Layout header={<Navigation />}>
      <Hero />
      <section className="text-black bg-white">
        <Services />
      </section>
      <section className="text-black bg-gray-300" id="contact">
        <ContactForm />
      </section>
      <Footer />
    </Layout>
  );
};

export default Homepage;
