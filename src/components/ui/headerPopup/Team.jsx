import React from "react";
import Image1 from "../../../assets/images/01.png";
import Image2 from "../../../assets/images/02.png";
import Image3 from "../../../assets/images/03.png";

const members = [
  {
    name: "Jude Yang, Ph.D.",
    title: "Librarian for Korean Studies",
    university: "Yale University",
    image: Image1,
    profile: "https://branford.yalecollege.yale.edu/jude-yang",
    description:
      "As Principal Investigator, she oversaw the project's strategic direction and team coordination, secured funding, led meetings and workshops, facilitated collaborations, and promoted the project. Additionally, as a team member, she contributed by performing data cleaning and analysis, exploring visualization tools, and drafting website content and text.",
  },
  {
    name: "Jee-Young Park",
    title: "Korean Studies Librarian",
    university: "Stanford University",
    image: Image2,
    profile: "https://library.stanford.edu/people/jee-young-park",
    description:
      "She contributed to a range of tasks throughout the project—exploring visualization tools, drafting and website text. Based on her experience as the leader of the BKP 1900–1945 project, she offered valuable insights into the original data, facilitating efficient and comprehensive data cleaning and analysis.",
  },
  {
    name: "Hyoungbae Lee",
    title: "Korean Studies Librarian",
    university: "Princeton University",
    image: Image3,
    profile:
      "https://library.princeton.edu/about/staff-directory/hyoungbae-lee",
    description:
      "With his expertise in programming and linguistics, he contributed to the project by recommending streamlined data cleaning techniques and exploring the incorporation of data visualization tools, while also participating in various tasks throughout the project, including data cleaning and providing website content and texts.",
  },
];

const Team = () => {
  return (
    <div className="font-notosans space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member.name}
            className="flex flex-col items-start text-left"
          >
            {/* <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mb-4"
            /> */}
            <a
              href={member.profile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold underline"
            >
              {member.name}
            </a>
            <p className="text-sm text-gray-500">{member.title}</p>
            <p className="text-sm text-gray-500 mb-4">{member.university}</p>
            <p className="text-sm text-gray-700">{member.description}</p>
          </div>
        ))}
      </div>

      <footer className="text-left text-sm text-gray-500 mt-6 border-t pt-4">
        {" "}
        {/* text-center에서 text-left로 변경 */}
        © 2024 Project Team of DH Bibliography of Modern Korean Periodicals
        (BMKP) <br />
        <p className="text-xs">
          Contact:{" "}
          <a href="mailto:bkppys@gmail.com" className="underline text-xs">
            Project DH BMKP Team
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Team;
