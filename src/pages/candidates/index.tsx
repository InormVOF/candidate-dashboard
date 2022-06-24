import { useStaticQuery, graphql } from "gatsby";
import * as React from "react";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const Candidates = () => {
  const {
    allAirtableCandidate: { nodes: data },
  } = useStaticQuery(graphql`
    query CandidatesQuery {
      allAirtableCandidate(filter: { data: { Status: { eq: "Complete" } } }) {
        nodes {
          id
          data {
            Title
            Description
            Picture {
              thumbnails {
                full {
                  url
                }
                large {
                  url
                }
                small {
                  url
                }
              }
            }
            Languages
            Developer_name
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
          }
        }
      }
    }
  `);

  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    setCandidates(
      data.map(({ id, data: row }: any) => {
        console.log(row.Picture);

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
        };
      })
    );
  }, [data]);

  return (
    <Layout>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
          <div>Details here</div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            {candidates.map((candidate) => (
              <li key={candidate.id} className="border-b-2 border-gray-400">
                <div className="flex">
                  <img src={candidate.person.picture?.small?.url} />
                  <div className="flex flex-col ">
                    <a>{candidate.person.name.firstName}</a>
                    <p className="overflow-hidden truncate">
                      {candidate.title}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Candidates;
