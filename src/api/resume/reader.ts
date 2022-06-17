import { readFileSync } from "fs";
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

const extractSkills = (skills: any[], type = "OperationalSkill"): Skill[] => {
  return skills
    .filter((skill) => skill.Type === type)
    .filter((skill) => skill.ExperienceInMonths > 0)
    .map((skill) => ({
      name: skill.Skill,
      experienceInMonths: skill.ExperienceInMonths,
    }));
};

const parseResume = async (path: string): Promise<Resume> => {
  const { ResumeParserData: data } = JSON.parse(
    readFileSync("resume.json").toString()
  );
  const resume: Resume = {
    person: {
      name: {
        firstName: data.Name.FirstName,
        middleName: data.Name.MiddleName,
        lastName: data.Name.LastName,
      },
    },
    title: data.JobProfile,
    description: data.Experience,
    techSkills: extractSkills(data.SegregatedSkill),
    softSkills: [],
    experiences: [],
    education: data.Qualification,
  };
  return resume;
};

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const resume = await parseResume("resume.docx");
  res.send(resume);
}
