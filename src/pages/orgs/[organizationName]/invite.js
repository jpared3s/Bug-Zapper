import Head from "next/head"
import { useRouter } from "next/router"

import { Formik, Form, Field } from "formik"

import axios from "axios"

import prisma from "@/lib/prisma/prisma"
import { NamespaceNameCreationSchema } from "@/lib/yup-schemas"

import "bootstrap/dist/css/bootstrap.min.css"
import Header from "@/components/Header"

export default function IssuesCreate(props) {
  const router = useRouter()
  const { organizationName } = router.query

  console.log(props)
  const cancelInvite = (inviteId) => {
    console.log("deleting: ", inviteId)
    axios
      .delete(`/api/organization/${organizationName}/invites`, {
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
        <title>Invite Users</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="mt-5 pt-5" />

      <div className="container">
        <div className="d-flex justify-content-between">
          <h2>Invite a user</h2>
        </div>

        <hr />
      </div>

      <main className="container">
        <div className="row g-5">
          <div className="col-md-8">
            <article>
              <Formik
                initialValues={{
                  name: ""
                }}
                validationSchema={NamespaceNameCreationSchema}
                onSubmit={(values, { setSubmitting, setFieldError }) => {
                  axios
                    .post(`/api/organization/${organizationName}/invites`, {
                      name: values.name
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
                    .finally(() => {
                      setSubmitting(false)
                    })
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                  /* and other goodies */
                }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Username
                      </label>
                      <Field className="form-control" type="text" name="name" />
                    </div>

                    {errors.name && <div>{errors.name}</div>}
                    <hr />

                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={isSubmitting}
                    >
                      Invite User
                    </button>
                  </Form>
                )}
              </Formik>
            </article>
          </div>
        </div>

        <div>
          <div className="mb-4 mt-5">
            <h1>Outgoing Invites ({props.outgoingInvites.length})</h1>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Invited By</th>
                <th scope="col">Invited At</th>
                <th scope="col">Role</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {props.outgoingInvites.map((invite, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a href={`/${invite.invitedUser.username}`}>
                      {invite.invitedUser.username}
                    </a>
                  </td>
                  <td>
                    <a href={`/${invite.inviteeUser.username}`}>
                      {invite.inviteeUser.username}
                    </a>
                  </td>
                  <td>{invite.createdAt}</td>
                  <td>{invite.role}</td>
                  <td>
                    <button className="btn btn-danger" type="button" onClick={() => cancelInvite(invite.id)}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </>
  )
}


export async function getServerSideProps(context) {
  const { organizationName } = context.query
  const outgoingInvites = await prisma.organizationInvitation.findMany({
    where: {
      organization: {
        name: organizationName
      }
    },
    select: {
      id: true,
      createdAt: true,
      role: true,
      invitedUser: {
        select: {
          username: true
        }
      },
      inviteeUser: {
        select: {
          username: true
        }
      }
    }
  })
  console.log(outgoingInvites)

  const mapped = outgoingInvites.map((e) => {
    return {
      ...e,
      createdAt: e.createdAt.toISOString()
    }
  })

  return {
    props: {
      outgoingInvites: mapped
    }
  }
}
