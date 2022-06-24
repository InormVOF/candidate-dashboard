import React, { useEffect, useState } from "react";
import { Input } from "./Input";
import ReactStars from "react-rating-stars-component";

const Form = ({ children }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="border-t border-gray-200">
        <dl>{children}</dl>
      </div>
    </div>
  );
};

const Row = ({ label, filled = false, children }) => {
  return (
    <div
      className={`${
        filled ? "bg-gray-50" : "bg-white"
      } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 w-full`}
    >
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {children}
      </dd>
    </div>
  );
};

export const ResumeForm = ({ resume, file, url = null }: UploadedResume) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const [experiences, setExpierences] = useState<Experience[]>([]);

  useEffect(() => {
    setExpierences(resume.experiences);
  }, [resume.experiences]);

  useEffect(() => {
    console.log(experiences);
  }, [experiences]);

  return (
    <Form>
      <Row label="First name" filled>
        <Input type="text" value={resume.person.name.firstName} />
      </Row>
      <Row label="Middle name">
        <Input type="text" value={resume.person.name.middleName} />
      </Row>
      <Row label="Last name" filled>
        <Input type="text" value={resume.person.name.lastName} />
      </Row>
      <Row label="Title">
        <Input type="text" value={resume.title} />
      </Row>
      <Row label="Description" filled>
        <textarea className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm border-gray-500 border rounded-md h-48">
          {resume.description}
        </textarea>
      </Row>
      <Row label="Technical skills">
        <ul
          role="list"
          className="border border-gray-200 rounded-md divide-y divide-gray-200"
        >
          {resume.techSkills.map((skill) => (
            <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
              <input
                type="checkbox"
                className="checked:bg-blue-500"
                defaultChecked={skill.level > 2}
              />
              <div className="w-0 flex-1 flex items-center pl-2">
                <Input type="text" value={skill.name} />
              </div>
              <div className="ml-4 flex-shrink-0">
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                  value={skill.level}
                />
              </div>
            </li>
          ))}
        </ul>
      </Row>
      <Row label="Experience" filled>
        <ul
          role="list"
          className="border border-gray-200 rounded-md divide-y divide-gray-200"
        >
          {experiences.map((experience) => (
            <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm w-full">
              <dl className="w-full">
                <Row label="Project" filled>
                  <Input type="text" value={experience.customerProject} />
                </Row>
                <Row label="Job title">
                  <Input type="text" value={experience.jobTitle} />
                </Row>
                <Row label="Description" filled>
                  <textarea className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm border-gray-500 border rounded-md h-48">
                    {experience.description}
                  </textarea>
                </Row>
                <Row label="Start date">
                  <Input
                    type="date"
                    value={experience.startDate?.split("T")[0]}
                  />
                </Row>
                <Row label="End date" filled>
                  <Input
                    type="date"
                    value={experience.endDate?.split("T")[0]}
                  />
                </Row>
              </dl>
            </li>
          ))}
        </ul>
        <button
          className=""
          onClick={() => setExpierences([...experiences, {}])}
        >
          +
        </button>
      </Row>
    </Form>
  );
};
