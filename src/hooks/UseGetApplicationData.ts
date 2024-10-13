import { useState, useEffect } from "react";
import type { ApplicationData } from "../types/applications.types";
import applicationsData from "../../data/applications.json"; // Adjust the path accordingly

const useGetApplicationData = (): ApplicationData[] => {
  const [applications, setApplications] = useState<ApplicationData[]>([]);

  useEffect(() => {
    // Directly set the imported JSON data
    setApplications(applicationsData);
  }, []);

  return applications;
};

export default useGetApplicationData;
