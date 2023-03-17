import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import layoutStyles from '@/styles/OrgLayout.module.css'
import Header from "@/components/Header";
import { useRouter } from 'next/router'
import OrganizationContainer from '@/components/OrganizationContainer';
import OrgProjectSection from '@/components/OrgProjectSection'

const inter = Inter({ subsets: ['latin'] })

export default function Org() {
  const orgName = "Bug Zapper";
  const bio = "Z";
  const projects = [
    { id: 1, name: "Tweeter App", description: "Twitter clone app", updated_at: "March 17 2023" },
    { id: 2, name: "Scheduler App", description: "Scheduler Appointment App", updated_at: "March 17 2023" },
  ];
  const users = ["Julian Paredes", "Andrew Caruso"]
  return (
    <>
      <Head>
        <title>Orgs view</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${layoutStyles.main} ${layoutStyles.mainContent}`}>
      <Header />
      <div className={layoutStyles.profileContainer}>
        <OrganizationContainer orgName={orgName} bio={bio}/>
        </div>
        <div className={layoutStyles.projectSection}>
        <OrgProjectSection projects={projects} />
        </div>
      </main>
    </>
  )
}


