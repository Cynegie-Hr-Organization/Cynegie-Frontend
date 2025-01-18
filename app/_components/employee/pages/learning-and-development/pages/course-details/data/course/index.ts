import { CourseDetailsProps } from "../../types";

const courseDetails: CourseDetailsProps[] = [
  {
    name: "Course Title",
    text: "Leadership Essentials",
  },
  {
    name: "Description",
    text: "This course is designed to help you build foundational leadrship skills. It covers essential leadership principles, communication strategies, team management and decision making techniques preparing you to lead effectively in any environment",
  },
  {
    name: "Objectives",
    list: [
      "Understand the core principles of leadership",
      "Develop effective communication strategies",
      "Learn how to manage team dynamics and conflicts",
      "Master decision making techniques for leadership",
    ],
  },
  {
    name: "Syllabus",
    sectionType: "Module",
    sections: [
      {
        name: "Introduction to Leadership",
        subSections: [
          "What is leadership?",
          "The role of a leader",
          "Leadershp styles",
        ],
      },
    ],
  },
  {
    name: "Course Duration",
    duration: {
      start: "28 July 2024",
      end: "28 August 2024",
    },
  },
  {
    name: "Certificate",
    text: "Yes (upon completion)",
  },
];

export default courseDetails;
