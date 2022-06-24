import React from "react";

export const ResumePreview = ({ url }: { url: string }) => {
  return <iframe src={`${url}#toolbar=0`} className="w-full h-full"></iframe>;
};
