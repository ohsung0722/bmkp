import React from "react";

const Guide = () => {
  return (
    <div className="font-notosans space-y-8 text-gray-700 max-h-[80vh] overflow-y-auto pr-2 text-left custom-scrollbar">
      <section>
        <h3 className="font-notosans text-lg font-bold uppercase mb-1">
          User Manual
        </h3>
        <div className="w-full h-[1px] bg-gray-900 mb-4"></div>
        <p>
          This guide is intended to provide users with assistance on how to use
          the DH Bibliography of Modern Korean Periodicals (BMKP). Each of the
          items below contains detailed information on how the contents of the
          bibliography have been classified and notated.
        </p>
      </section>

      <section>
        <h3 className="font-notosans text-lg font-bold uppercase mb-1">
          Citation
        </h3>
        <div className="w-full h-[1px] bg-gray-900 mb-4"></div>
        <p>
          BMKP is pleased to share visualizations and bibliographic data for use
          by other researchers for non-commercial purposes. If you wish to use
          any information from this site, please ensure proper citation. For
          inquiries regarding the reuse of content, please contact the{" "}
          <a href="#" className="underline">
            Team
          </a>
          .
        </p>
      </section>

      <section>
        <h3 className="font-notosans text-lg font-bold uppercase mb-1">
          Features
        </h3>
        <div className="w-full h-[1px] bg-gray-900 mb-4"></div>
        <div className="space-y-4">
          <div>
            <strong>Node</strong>{" "}
            <div>
              A node refers to an entity within a network and is represented by
              a circular dot. These nodes represent specific data, such as the
              names of periodicals, publishers, subjects, and more.
            </div>
          </div>
          <div>
            <strong>Link</strong>{" "}
            <div>
              Links between nodes represent the relationships or interactions
              between two entities (nodes). Links provide an interactive
              analysis of the relationships among publication dates,
              individuals, locations, and magazine characteristics, etc.
            </div>
          </div>
          <div>
            <strong>Node differentiation</strong>{" "}
            <div>
              To distinguish nodes within the network, if a periodical title is
              the same, additional information—publisher, editor, and year of
              publication—was added sequentially to differentiate them.
            </div>
          </div>
          <div>
            <strong>Search Feature</strong>{" "}
            <div>
              The search function includes not only exact word searches but also
              related keywords.
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-notosans text-lg font-bold uppercase mb-1">
          Journal Usage Guide
        </h3>
        <div className="w-full h-[1px] bg-gray-900 mb-4"></div>
        <div className="space-y-4">
          <div>
            <strong>Journal Titles</strong>{" "}
            <div>
              The journal titles are transcribed as they originally appeared on
              the title or cover page. (e.g. 가정 [가뎡], 가톨릭 [가톨닉]).
            </div>
          </div>
          <div>
            <strong>
              Initial Consonant Sound Rule (두음법칙) on the Title Page
            </strong>{" "}
            <div>
              When the initial consonant rule (두음법칙) applies to the title,
              two versions are provided using the "=" symbol. (e.g. 력사제문제 =
              역사제문제, 로동세게 = 노동세계).
            </div>
          </div>

          <div>
            <strong>Journal Publication Years</strong>{" "}
            <div>
              {" "}
              The bibliography mainly includes journals from the period under
              Japanese colonial rule of 1910–1945. It also covers the associated
              periods immediately before and after colonial rule: the Great
              Korean Empire (Taehan Cheguk) of 1897-1910 and the United States
              Army Military Government in Korea (USAMGIK) of 1945-1948.
            </div>
          </div>
          <div>
            <strong>Types of Journals</strong>{" "}
            <div>
              The bibliography includes periodical publications, irregularly
              published periodicals, yearbooks, organizational mouthpieces, and
              school publications.
            </div>
          </div>
          <div>
            <strong>Subject Areas</strong>{" "}
            <div>
              The bibliography covers journals published in a wide range of
              subject areas, including literature, politics, economy, education,
              society, culture, industry, current affairs, cultural refinement,
              medicine, science, art, friendship societies, etc.
            </div>
          </div>
          <div>
            <strong>Title</strong>
            <div>
              <strong> 1) How the Titles Were Organized</strong>
              <div>
                Most periodical titles from the period of Japanese colonial rule
                (1910-1945) are written in Classical Chinese (Hanja). To make
                access easier for users, the bibliography provides notation of
                each title in Hangŭl, romanization, and English translation.
              </div>
            </div>
            <div>
              <strong> 2) Other Parallel Title</strong>
              <div>
                Parallel titles have been transcribed in cases when a
                periodical’s title is written in a second language or when a
                periodical is known by a title other than its original title.
              </div>
            </div>
            <div>
              <strong> 3) Original Title</strong>
              <div>
                Some titles of periodicals are written in two languages or
                spelled incorrectly. In order to provide accurate information in
                such cases, the original titles have been transcribed from the
                actual title pages.
              </div>
            </div>
            <div>
              <strong> 4) Parenthetical Information</strong>
              <div>
                Parenthetical information containing the names of publishers
                appears in order to differentiate journals published under the
                identical title. If publisher names too are identical, the years
                of publication appear in parenthesis following the publisher
                name.
              </div>
            </div>
            <div>
              <strong> 5) Japanese-language Periodicals</strong>
              <div>
                Japanese-language titles are translated with Classical Chinese
                characters whenever possible. Otherwise, well-known translations
                of titles are provided.
              </div>
            </div>
          </div>
          <div>
            <strong>Romanization (Korean)</strong>{" "}
            <div>
              Romanization follows the McCune–Reischauer system of notation and
              spacing as outlined by the American Library Association - Library
              of Congress (ALA-LC). (For more information, please refer to
              ALA-LC Romanization Tables: Korean Romanization and Word
              Division.)
            </div>
          </div>
          <div>
            <strong>Romanization (Exceptions)</strong>{" "}
            <div>
              Spaces are added between particles (의 [ŭi] / 之 [chi]) and other
              parts of speech in cases of non-meaningful binary word division
              (e.g. 가정 지 우 [Kajŏng chi u], 여성 지 우 [Yŏsŏng chi u]).
            </div>
          </div>
          <div>
            <strong>Notation Of Years</strong>{" "}
            <div>
              The letter "u" denotes uncertain years of publication. For
              example, if the 1930s are the most specific period of known
              publication for a periodical, then its years of publication are
              notated as 193u.
            </div>
          </div>
          <div>
            <strong>Publication Country</strong>{" "}
            <div>
              “Publ. Country” indicates the country in which a periodical was
              published.
            </div>
          </div>
          <div>
            <strong>Location (Published City)</strong>{" "}
            <div>
              The city of publication for periodicals printed in present-day
              Seoul (Sŏul) are notated as follows: 1896-1910 - Hansŏng (한성) /
              1910-1945 - Kyŏngsŏng / Keijō (경성) / 1946-1948 - Sŏul (서울)
            </div>
          </div>
          <div>
            <strong>Location Names</strong>{" "}
            <div>
              The names of locations are written in accordance with
              Korean-language loanword orthography (e.g. 도쿄 [Tok'yo], 베이징
              [Peijing]).
            </div>
          </div>
          <div>
            <strong>Editorial, Publication, And Printing Information</strong>{" "}
            <div>
              When available, the editorial, publication, and printing details
              of a periodical are listed based on information appearing in its
              inaugural issue. When an inaugural issue is unavailable, a
              significant or other issue number is used for reference.
            </div>
          </div>
          <div>
            <strong>Editor, Publisher</strong>{" "}
            <div>
              The names of editors and publishers have been transcribed
              regardless of their relation to real names and pen names. Whenever
              possible, real names have been added in the Description section
              (e.g. 집단 [Chiptan]).
            </div>
          </div>
          <div>
            <strong>Language</strong>{" "}
            <div>
              The language of each journal is determined based on the language
              in which the main text is written regardless of what languages
              appear on the cover page, title page, colophon, etc.
            </div>
          </div>
          <div>
            <strong>Name Order For Korean And Japanese Names</strong>{" "}
            <div>
              Korean and Japanese names are written without commas in the order
              of surname first and given name second.
            </div>
          </div>
          <div>
            <strong>Japanese Names Without Romanization</strong>{" "}
            <div>
              Although the bibliography provides romanization whenever possible,
              in cases when the correct romanization of a Japanese name is not
              available, the name is written only in Japanese.
            </div>
          </div>
          <div>
            <strong>Category (Subject)</strong>{" "}
            <div>
              Journals have been categorized into subjects based on their
              content. In cases when several subjects are present in one
              journal, categorization follows the subject occupying the greatest
              proportion. When categorization of a journal proves too difficult,
              the journal is categorized as "Unclassified" (미분류).
            </div>
          </div>
        </div>
      </section>
      <section>
        <h3 className="font-notosans text-lg font-bold uppercase mb-1">
          OTHER NOTES
        </h3>
        <div className="w-full h-[1px] bg-gray-900 mb-4"></div>
        <div className="mt-4">
          <strong>WorldCat Link</strong>
          <div>
            Whenever available, journals include a WorldCat link with
            information on holding institutions and call numbers.
          </div>
        </div>
        <div className="mt-4">
          <strong>Cover Images</strong>
          <div>
            The cover image of the journal was added along with each journal’s
            information. When the cover image could not be found, the title page
            image was used instead.
          </div>
        </div>
        <div className="mt-4">
          <strong>Conflicting Information</strong>
          <div>
            The majority of errors and conflicting information were discovered
            to have been rooted in issues associated with preservation, the
            condition of photo print reproductions, etc. In these instances, as
            many primary and secondary sources as possible were referenced.
          </div>
        </div>
      </section>
      <section>
        <h3 className="font-notosans text-lg font-bold uppercase mb-1">
          Technologies for DH and Web Development
        </h3>
        <div className="w-full h-[1px] bg-gray-900 mb-4"></div>
        <div>
          <strong>Libraries & Technologies:</strong>
          <div>
            <ul className="list-disc pl-5">
              <li>React / React-DOM (Frontend framework)</li>
              <li>Tailwind CSS (Utility-first CSS framework)</li>
              <li>xlsx (Excel I/O library)</li>
              <li>Recoil (State management for service-related values)</li>
              <li>D3.js (Data visualization library)</li>
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <strong>Infrastructure:</strong>
          <div>
            <ul className="list-disc pl-5">
              <li>Amazon S3 (Storage)</li>
              <li>CloudFront (Content delivery network)</li>
              <li>Route 53 (Domain management)</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="text-sm text-gray-500 mt-6 border-t pt-4">
        © 2024 Project Team of DH Bibliography of Modern Korean Periodicals
        (BMKP) <br />
      </footer>
    </div>
  );
};

export default Guide;
