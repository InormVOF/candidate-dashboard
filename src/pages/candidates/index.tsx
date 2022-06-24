import { useStaticQuery, graphql, navigate } from "gatsby";
import * as React from "react";
import { useEffect } from "react";
import Layout from "../../components/Layout";

const FirstCandidate = () => {
  const {
    allAirtableCandidate: { nodes: data },
  } = useStaticQuery(graphql`
    query FirstCandidateQuery {
      allAirtableCandidate(
        filter: { data: { Status: { eq: "Complete" } } }
        limit: 1
      ) {
        nodes {
          id
        }
      }
    }
  `);

  useEffect(() => {
    const first = data.pop();
    if (first?.id) {
      navigate(`/candidates/${first.id}`);
    }
  }, [data]);

  return (
    <Layout>
      <progress className="progress w-56"></progress>
    </Layout>
  );
};

export default FirstCandidate;
