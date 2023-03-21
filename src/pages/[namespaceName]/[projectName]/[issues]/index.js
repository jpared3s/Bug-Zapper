import Head from "next/head";
import styles from "@/styles/IssueContainer.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Issue from "@/components/issueContainer";
import IssueButtons from "@/components/IssueButtons";
import SearchBar from "@/components/IssueSearchBar";
import { useState } from "react";
import prisma from "@/lib/prisma/prisma";

//Fake data for now
// const issuesData = [
//   {
//     title: 'Font Awesome Install Bug',
//     issueNumber: 1,
//     description: 'Unable to rend icons on webpage',
//     status: 'Open',
//     createdAt: '2023-03-01',
//     updatedAt: '2023-03-02',
//   },
//   {
//     title: 'User Login Bug',
//     issueNumber: 2,
//     description: 'User unable to log in',
//     status: 'Closed',
//     createdAt: '2023-03-16',
//     updatedAt: '2023-03-17',
//   },
// ];

//commented out the hardcoded data above and below is the fetch for issue data
export async function getServerSideProps() {
  const issuesData = await prisma.issue.findMany({
    include: {
      labels: true,
    },
  });

  return {
    props: {
      issuesData: issuesData.map((issue) => ({
        ...issue,
        createdAt: issue.createdAt.toISOString(),
        updatedAt: issue.updatedAt.toISOString(),
      })),
    },
  };
}

//added issuesData as a prop
export default function Issues({ issuesData }) {
  const [filteredIssues, setFilteredIssues] = useState(issuesData);

  const handleSearch = (searchTerm) => {
    const filtered = issuesData.filter((issue) =>
      issue.labels.some((label) =>
        label.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredIssues(filtered);
  };

  return (
    <>
      <Head>
        <title>Issues list</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainContainer}>
        <Header />
        <div className={styles.topContainer}>
          {" "}
          Add a container for the top elements
          <IssueButtons />
        </div>
        <div className={styles.issueListContainer}>
          {filteredIssues.map((issue, index) => (
            <Issue key={index} issue={issue} />
          ))}
        </div>
        <Footer />
      </main>
    </>
  );
}
