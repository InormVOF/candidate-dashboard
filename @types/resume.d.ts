interface Candidate {
  id?: string;
  person: Person;
  title: string;
  description: string;
  techSkills: Skill[];
  softSkills: Skill[];
  experiences: Experience[];
  education: string;
}

interface UploadedResume {
  file: File;
  resume: Resume;
  url: string;
}

interface Person {
  name: PersonName;
  dateOfBirth?: Date;
  gender?: "male" | "female";
  maritalStatus?: string;
  nationality?: string;
  licenseNo?: string;
  passport?: PersonPassport;
  email?: string;
  picture?: {
    full?: Picture;
    large?: Picture;
    small?: Picture;
  };
}

interface PersonName {
  firstName: string;
  middleName?: string;
  lastName?: string;
}

interface PersonPassport {
  passportNumber: string;
  dateOfExpiry: Date;
  DateOfIssue: Date;
  PlaceOfIssue: string;
}

interface Skill {
  name: string;
  level: number;
  experienceInMonths?: number;
}

interface Experience {
  customerProject?: string;
  jobTitle?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

interface Picture {
  url: string;
}
