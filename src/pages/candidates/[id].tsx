import { useStaticQuery, graphql, navigate } from "gatsby";
import * as React from "react";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

interface Props {
  id: string;
}

const Candidate = ({ id }: Props) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidate, setCandidate] = useState<Candidate>();

  const {
    allAirtableCandidate: { nodes: data },
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
          }
        }
      }
    }
  `);

  useEffect(() => {
    setCandidates(
      data.map(({ id, data: row }: any) => {
        return {
          id,
          person: {
            name: {
              firstName: row.Developer_name,
            },
            picture: row.Picture[0].thumbnails,
          },
          title: row.Title,
          description: row.Description,
          rate: row.Hour_rate,
        };
      })
    );
  }, [data]);

  useEffect(() => {
    if (id && candidates) {
      setCandidate(candidates.find((c) => c.id === id));
    }
  }, [candidates, id]);

  console.log(candidate);

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
          <List candidates={candidates} />
        </div>
      </div>
    </Layout>
  );
};

const List = ({ candidates }: { candidates: Candidate[] }) => {
  return (
    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
      <li className="menu-title">
        <span>Candidates</span>
      </li>
      {candidates.map((candidate) => (
        <li key={candidate.id} className="border-b-2 border-gray-400">
          <a
            className="flex"
            onClick={() => navigate(`/candidates/${candidate.id}`)}
          >
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
    <div className="flex">
      <img
        src={candidate.person.picture?.large?.url}
        className="rounded w-96"
      />
      <div className="flex flex-col prose pl-4">
        <h1>{candidate.person.name.firstName}</h1>
        <p>{candidate.description}</p>
        <p>Rate: € {Math.round(candidate.rate || 0)},- </p>
      </div>
    </div>
  );
};

export default Candidate;
