import Head from "next/head"
import layoutStyles from "@/styles/usersLayout.module.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

import prisma from "@/lib/prisma/prisma"
import { getServerSession } from "@/lib/sessions"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"

export default function MyInvites(props) {
  console.log(props)

  const acceptInvitation = (inviteId) => {
    console.log("accepting: ", inviteId)
    axios
      .post("/api/user/invites", {
        inviteId: inviteId
      })
      .then((response) => {
        console.log("RESPONSE:", response)
        // TODO: Redirect to new project page
        // router.push("/")
      })
      .catch((error) => {
        console.log("ERROR:", error.response.data)
        console.log("ERROR:", error)
      })
  }

  const declineInvitation = (inviteId) => {
    console.log("declining: ", inviteId)
    axios
      .delete("/api/user/invites", {
        data: {
          inviteId: inviteId
        }
      })
      .then((response) => {
        console.log("RESPONSE:", response)
        // TODO: Redirect to new project page
        // router.push("/")
      })
      .catch((error) => {
        console.log("ERROR:", error.response.data)
        console.log("ERROR:", error)
      })
  }

  return (
    <>
      <Head>
        <title>My Invites</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${layoutStyles.main} ${layoutStyles.mainContent}`}>
        <Header />
        <div className={layoutStyles.labelsContainer}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Type</th>
                <th scope="col">Name</th>
                <th scope="col">Invited By</th>
                <th scope="col">Invited At</th>
                <th scope="col">Role</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {props.invites.map((invite, index) => (
                <tr key={index + 1}>
                  <th scope="row">{index}</th>
                  {invite.organization ? (
                    <>
                      <th scope="row">Organization</th>
                      <td>
                        <a>{invite.organization.name}</a>
                      </td>
                      <td>
                        <a href={`/${invite.inviteeUser.username}`}>
                          {invite.inviteeUser.username}
                        </a>
                      </td>
                    </>
                  ) : (
                    <>
                      <th scope="row">Project</th>
                      <td>
                        <a>{invite.project.name}</a>
                      </td>
                      <td>
                        <a
                          href={`/${invite.inviteeUser.username}/${invite.project.name}`}
                        >
                          {invite.inviteeUser.username}
                        </a>
                      </td>
                    </>
                  )}
                  <td>{invite.createdAt}</td>
                  <td>{invite.role}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={() => acceptInvitation(invite.id)}
                    >
                      Accept
                    </button>{" "}
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => declineInvitation(invite.id)}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res)
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  const invites = await prisma.memberInvitation.findMany({
    where: {
      invitedId: session.user.id
    },

    select: {
      id: true,
      role: true,
      createdAt: true,
      inviteeUser: {
        select: {
          username: true
        }
      },
      organization: {
        select: {
          name: true
        }
      },
      project: {
        select: {
          name: true
        }
      }
    }
  })

  if (!invites) {
    return {
      props: {
        invites: []
      }
    }
  }

  // const organizationInvites = await prisma.organizationInvitation.findMany({
  // where: {
  //   invitedId: session.user.id
  // },

  //   select: {
  //     id: true,
  //     role: true,
  //     createdAt: true,
  // inviteeUser: {
  //   select: {
  //     username: true
  //   }
  // },
  // organization: {
  //   select: {
  //     name: true
  //   }
  // }
  //   }
  // })

  console.log(invites)

  const mapped = invites.map((e) => {
    return {
      ...e,
      createdAt: e.createdAt.toISOString()
    }
  })

  return {
    props: {
      invites: mapped
    }
  }
}
