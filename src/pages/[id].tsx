import { useStaticQuery, graphql, navigate } from "gatsby";
import * as React from "react";
import { useEffect, useState } from "react";
import Select, { Options } from "react-select";

import { Rating } from "../components/Rating";
import Layout from "../components/Layout";
import format from "date-fns/format";

interface Props {
  id: string;
}

const Candidate = ({ id }: Props) => {
  const [allCandidates, setAllCandidates] = useState<Candidate[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidate, setCandidate] = useState<Candidate>();
  const [skills, setSkills] = useState<any[]>();
  const [filteredSkills, setFilteredSkills] = useState<string[]>();

  const {
    allAirtableCandidate: { nodes: data },
    allAirtableSkill: { nodes: allSkills },
  } = useStaticQuery(graphql`
    query CandidatesQuery {
      allAirtableCandidate(filter: { data: { Status: { eq: "Complete" } } }) {
        nodes {
          id
          data {
            Developer_name
            Title
            Description
            Skills {
              data {
                Level
                Skill {
                  data {
                    Name
                  }
                }
              }
            }
            Experience {
              data {
                Description
                Project_name
                Enddate
                Startdate
                Role
              }
            }
            Picture {
              thumbnails {
                large {
                  url
                }
                small {
                  url
                }
              }
            }
            Languages
            Hour_rate
            Country
          }
        }
      }
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
    setAllCandidates(
      data.map(({ id, data: row }: any): Candidate => {
        return {
          id,
          person: {
            name: {
              firstName: row.Developer_name,
            },
            picture: row.Picture[0].thumbnails,
            country: row.Country,
          },
          title: row.Title,
          description: row.Description,
          rate: Math.round(row.Hour_rate),
          techSkills: row.Skills?.map(
            ({ data: skill }: any): Skill => ({
              name: skill.Skill[0]?.data?.Name,
              level: skill.Level,
            })
          ).sort((a: Skill, b: Skill) => b.level - a.level),
          languages: row.Languages?.join(", "),
          experiences: row.Experience?.map(
            ({ data: experience }: any): Experience => ({
              customerProject: experience.Project_name,
              jobTitle: experience.Role,
              description: experience.Description,
              startDate: experience.Startdate,
              endDate: experience.Enddate,
            })
          ),
        };
      })
    );
  }, [data]);

  useEffect(() => {
    if (id && allCandidates) {
      setCandidate(allCandidates.find((c) => c.id === id));
    }
    setCandidates(allCandidates);
  }, [allCandidates, id]);

  useEffect(() => {
    if (!allSkills) return;
    setSkills(
      allSkills.map(({ data: skill }: any) => ({
        value: skill.Name,
        label: skill.Name,
      }))
    );
  }, [allSkills]);

  const filterSkills = (selectedsKills: any) => {
    setFilteredSkills(selectedsKills.map((skill: any) => skill.value));
  };

  useEffect(() => {
    if (!filteredSkills || filteredSkills.length === 0) {
      setCandidates(allCandidates);
      return;
    }
    setCandidates(
      allCandidates.filter((candidate) => {
        return (
          candidate.techSkills?.filter((s) => filteredSkills.includes(s.name))
            .length === filteredSkills.length
        );
      })
    );
  }, [filteredSkills, id]);

  return (
    <Layout>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-4 pl-8 pt-14">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
          {candidate && <Details candidate={candidate} />}
        </div>
        <div className="drawer-side w-80">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <List
            candidates={candidates}
            selectedCandidate={candidate}
            filter={
              <Select
                options={skills}
                isMulti
                className="w-full"
                onChange={filterSkills}
                placeholder="Filter by skills"
              />
            }
          />
        </div>
      </div>
    </Layout>
  );
};

const List = ({
  candidates,
  selectedCandidate = undefined,
  filter = undefined,
}: {
  candidates: Candidate[];
  selectedCandidate?: Candidate;
  filter?: React.ReactNode;
}) => {
  return (
    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
      <li className="menu-title">
        <span>Candidates</span>
      </li>
      {filter && (
        <li>
          <div className="p-0 ml-4 my-2">{filter}</div>
        </li>
      )}
      {candidates.map((candidate) => (
        <li
          key={candidate.id}
          className={` ${
            candidate.id === selectedCandidate?.id ? "bordered" : ""
          }`}
        >
          <a className="flex" onClick={() => navigate(`/${candidate.id}`)}>
            <img
              src={candidate.person.picture?.small?.url}
              className="mask mask-circle"
            />
            <div className="flex flex-col ">
              <p>{candidate.person.name.firstName}</p>
              <p className="overflow-hidden truncate text-xs">
                {candidate.title}
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

const Details = ({ candidate }: { candidate: Candidate }) => {
  return (
    <div>
      <div className="flex">
        <img
          src={candidate.person.picture?.large?.url}
          className="rounded w-96 max-h-96"
        />
        <div className="flex flex-col prose pl-4">
          <h1>{candidate.person.name.firstName}</h1>
          <p>{candidate.description}</p>
          <p>Hourly rate: € {candidate.rate},-</p>
          <p>Language: {candidate.languages}</p>
          <p>Country: {candidate.person.country}</p>
        </div>
      </div>
      <div className="prose mt-4">
        <h3>Skills</h3>
        {candidate.techSkills?.map((skill) => (
          <div key={skill.name} className="prose flex">
            <h6 className="flex-1">{skill.name}</h6>
            <Rating value={skill.level} readonly />
          </div>
        ))}
      </div>
      <div className="prose mt-4">
        <h3>Recent experience</h3>
        {candidate.experiences?.map((experience: any, x) => (
          <div key={x} className="prose flex flex-col mb-8">
            <h5 className="text-xl">{experience.jobTitle}</h5>
            <h5 className="text-md">{experience.customerProject}</h5>
            <div>
              {format(new Date(experience.startDate), "PP")} -{" "}
              {format(new Date(experience.endDate), "PP") || "current"}
            </div>
            <div>{experience.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Candidate;
