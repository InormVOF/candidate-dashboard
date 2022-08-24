import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import format from "date-fns/format";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Layout from "../components/Layout";
import { ResumeForm } from "../components/ResumeForm";
import { FileUploader } from "../components/FileUploader";
import { ResumePreview } from "../components/ResumePreview";

const Home = () => {
  const [resumes, setResumes] = useState<UploadedResume[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newResumes: UploadedResume[] = [];
    for (let x = 0; x < acceptedFiles.length; x++) {
      const file = acceptedFiles[x];
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "lastModifiedDate",
        format(new Date(file.lastModified), "yyyy-MM-dd")
      );
      const respoonse = await fetch("api/resume/reader", {
        body: formData,
        method: "post",
      });
      const resume = await respoonse.json();
      const url = await reader(file);
      newResumes.push({ file, resume, url });
    }
    setResumes([...resumes, ...newResumes]);
  }, []);

  useEffect(() => {
    console.log(resumes);
  }, [resumes]);

  const reader = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(file);
    });
  };

  return (
    <Layout header={<FileUploader onDrop={onDrop} />}>
      <Tabs>
        <TabList>
          {resumes.map(({ file }) => (
            <Tab key={file.name}>{file.name}</Tab>
          ))}
        </TabList>
        {resumes.map(({ file, resume, url }) => (
          <TabPanel key={file.name}>
            <div className="flex">
              <div className="flex-1 max-h-screen overflow-auto">
                <ResumeForm resume={resume} file={file} url={url} />
              </div>
              <div className="flex-1 max-h-screen">
                <ResumePreview url={url} />
              </div>
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </Layout>
  );
};

export default Home;
