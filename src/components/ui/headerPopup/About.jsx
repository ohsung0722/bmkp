import React from "react";

const About = () => {
  return (
    <div className="font-pretendardRegular pr-2 space-y-6 text-gray-700 max-h-[80vh] overflow-y-auto text-left custom-scrollbar">
      <p>
        This project is aimed to facilitate research on a significant period in
        history—the Japanese occupation era—by providing a comprehensive network
        visualization of over 900 periodicals from that time. Through data
        visualization, we offer an interactive analysis of relationships among
        publication dates, individuals, locations, and magazine characteristics,
        supporting diverse academic inquiries into this era's historical,
        cultural, and social contexts.
      </p>

      <p>
        Magazines from this era are crucial primary sources that document
        intellectual discourse, cultural exchange, and social dynamics under
        colonial rule. They reflect the period's complex realities and are
        invaluable for researchers in history, literature, sociology, and
        related fields. There is a growing need for systematic analysis of these
        periodicals to preserve their intellectual legacy and to better
        understand this historically rich era.
      </p>

      <p>
        This project builds on the foundational work of the award-winning
        project,{" "}
        <span className="font-pretendardSemiBold underline">
          <a
            href="https://www.lib.uchicago.edu/collex/collections/bibliography-of-east-asian-periodicals-colonial-korea-1900-1945/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bibliography of East Asian Periodicals (Colonial Korea, 1900-1045)
          </a>
        </span>{" "}
        (BKP), expanding its focus to a wider range of periodicals and enhancing
        the analytical tools available. The project covers a broad spectrum of
        publications, from intellectual and literary magazines to political
        journals, capturing the intellectual diversity of the Japanese colonial
        period. Building on the success of the BKP project, the project team
        members sought out a Digital Humanities (DH) project to leverage the
        valuable data they had gathered.
      </p>

      <p>
        By employing digital humanities (DH) techniques, this project offers
        innovative ways to analyze and visualize complex bibliographic data.
        Unlike traditional static bibliographies, DH tools such as network
        analysis and data visualization allow for dynamic exploration of the
        relationships between key elements like authors, publication trends, and
        geographic distributions. This interactive approach uncovers new
        patterns and insights, enhancing both research efficiency and depth.
      </p>

      <div>
        <p className="font-pretendardSemiBold mb-2">
          The project promises several important contributions:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Enhanced Access and Systematic Information: Researchers will have
            better access to structured, searchable data on colonial-era
            periodicals, making it easier to integrate these sources into their
            work.
          </li>
          <li>
            New Research Opportunities: By utilizing data-driven methodologies,
            the project is expected to foster new academic discoveries and
            contribute to the growing body of research on the Japanese colonial
            period.
          </li>
          <li>
            Educational and Public Awareness: Visual materials and analytical
            results will also serve educational purposes, helping to increase
            public understanding and appreciation of the intellectual and
            cultural landscape of the period.
          </li>
        </ul>
      </div>

      <p>
        The project team deeply appreciates the generous support from the
        Council on East Asian Studies (CEAS) at Yale University, whose Research
        Fund made this project possible. We also extend our sincere gratitude to
        our dear colleagues, whose invaluable support has been integral to the
        success of this project.
      </p>

      <p className="text-sm text-gray-500 pt-4 border-t">
        © 2024 Project Team of DH Bibliography of Modern Korean Periodicals
        (BMKP)
      </p>
    </div>
  );
};

export default About;
