import React, { useEffect, useState } from "react";
import { Input } from "./Input";
import { Rating } from "./Rating";
import { useStaticQuery, graphql } from "gatsby";
import StringSimilarity from "string-similarity";

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

export const ResumeForm = ({ resume }: UploadedResume) => {
  const [candidate, setCandidate] = useState<Candidate>(resume);
  const [skills, setSkills] = useState<any[]>();
  const [allSkills, setAllSkills] = useState<any[]>();
  const [experiences, setExpierences] = useState<Experience[]>([]);

  const {
    allAirtableSkill: { nodes: allAirtableSkills },
  } = useStaticQuery(graphql`
    query SkillsQuery {
      allAirtableSkill(
        limit: 10000
        sort: { order: ASC, fields: data___Name }
      ) {
        nodes {
          data {
            Name
          }
        }
      }
    }
  `);

  useEffect(() => {
    if (!allAirtableSkills) return;
    setAllSkills(allAirtableSkills.map(({ data: skill }: any) => skill.Name));
  }, [allAirtableSkills]);

  const findBestMatchedSkill = (skill: string): string => {
    if (!allSkills) {
      return skill;
    }
    const {
      bestMatch: { rating, target },
    } = StringSimilarity.findBestMatch(skill, allSkills);
    if (rating < 0.5) {
      return skill;
    }
    return target;
  };

  useEffect(() => {
    if (!candidate.techSkills || !allSkills) {
      return;
    }
    setSkills(
      candidate.techSkills
        .map((skill: Skill) => ({
          ...skill,
          name: findBestMatchedSkill(skill.name),
          active: skill.level > 2,
        }))
        .sort((a: Skill, b: Skill) => {
          return b.level > 2
            ? b.level - a.level
            : (allSkills.includes(a.name) ? 0 : 1) -
                (allSkills.includes(b.name) ? 0 : 1);
        })
    );
  }, [candidate.techSkills, allSkills]);

  useEffect(() => {
    setExpierences(candidate.experiences);
  }, [candidate.experiences]);

  useEffect(() => {
    console.log(skills);
  }, [skills]);

  const updateSkill = (skill: Skill, index: number) => {
    setSkills(
      skills?.map((currentSkill: Skill, x) =>
        x === index ? skill : currentSkill
      )
    );
  };

  return (
    <Form>
      <Row label="First name" filled>
        <Input type="text" value={candidate.person.name.firstName} />
      </Row>
      <Row label="Middle name">
        <Input type="text" value={candidate.person.name.middleName} />
      </Row>
      <Row label="Last name" filled>
        <Input type="text" value={candidate.person.name.lastName} />
      </Row>
      <Row label="Title">
        <Input type="text" value={candidate.title} />
      </Row>
      <Row label="Description" filled>
        <textarea className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm border-gray-500 border rounded-md h-48">
          {candidate.description}
        </textarea>
      </Row>
      <Row label="Technical skills">
        <ul
          role="list"
          className="border border-gray-200 rounded-md divide-y divide-gray-200"
        >
          {skills?.map((skill: Skill, x) => {
            return (
              <li
                className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                key={skill.name}
              >
                <input
                  type="checkbox"
                  className="checked:bg-blue-500"
                  defaultChecked={skill.active}
                  onChange={(e) =>
                    updateSkill({ ...skill, active: e.target.checked }, x)
                  }
                />
                <div className="w-0 flex-1 flex items-center pl-2">
                  <Input
                    defaultValue={skill.name}
                    onChange={(e) =>
                      updateSkill({ ...skill, name: e.target.value }, x)
                    }
                  />
                </div>
                <div className="ml-4 flex-shrink-0">
                  <Rating
                    value={skill.level}
                    name={`skill${x}`}
                    onChange={(level) => updateSkill({ ...skill, level }, x)}
                  />
                </div>
              </li>
            );
          })}
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
