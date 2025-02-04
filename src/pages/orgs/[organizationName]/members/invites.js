import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import * as Dialog from "@radix-ui/react-dialog"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import BelowNavbar from "@/components/other/BelowNavbar"

import { useSession } from "next-auth/react"

import axios from "axios"
import prisma from "@/lib/prisma/prisma"
import Header from "@/components/Header"
import OrganizationBelowNavbar from "@/components/navbar/OrganizationBelowNavbar"
import moment from "moment"

export default function OrganizationMembers(props) {
  const router = useRouter()
  const { organizationName } = router.query

  const { data: session } = useSession()

  const [open, setOpen] = useState(false)

  const cancelInvite = (inviteId) => {
    console.log("canceling ", inviteId)
    axios
      .delete(`/api/orgs/${organizationName}/invites`, {
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
        <title>{organizationName} Outgoing Invitations</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Confirmation</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Are you sure you want to cancel the organization invite to {open.name}?
            </Dialog.Description>
            <div
              className="gap-2"
              style={{
                display: "flex",
                marginTop: 25,
                justifyContent: "flex-end"
              }}
            >
              <Dialog.Close asChild>
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  Cancel
                </button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <button
                  className="btn bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => cancelInvite(open.id)}
                >
                  Confirm
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="flex h-screen overflow-hidden bg-slate-100">
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            
          <Header />
          <OrganizationBelowNavbar namespaceName={organizationName} selected={"invites"}/>

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                    Outgoing Invitations
                  </h1>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
                <header className="px-5 py-4">
                  <h2 className="font-semibold text-slate-800">
                    {organizationName} Outgoing Invitations (
                    {props.outgoingInvites.length}){" "}
                  </h2>
                </header>

                <div>
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full rounded-xl shadow-lg">
                      <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                        <tr>
                          <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div className="font-semibold text-left">#</div>
                          </th>
                          <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div className="font-semibold">User</div>
                          </th>
                          <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div className="font-semibold">Invited By</div>
                          </th>
                          <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <span className="font-semibold">Invited At</span>
                          </th>
                          <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div className="font-semibold">Role</div>
                          </th>
                          <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <span className="sr-only">Menu</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-slate-200">
                        {props.outgoingInvites.map((invite, index) => (
                          <tr key={index}>
                            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                              <div className="text-left">{index + 1}</div>
                            </td>

                            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                              <div className="text-center">
                                <Link
                                  className="text-sky-400 hover:text-sky-700"
                                  href={`/${invite.invitedUser.username}`}
                                >
                                  {invite.invitedUser.username}
                                </Link>
                              </div>
                            </td>

                            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                              <div className="text-center">
                                <Link
                                  className="text-sky-400 hover:text-sky-700"
                                  href={`/${invite.inviteeUser.username}`}
                                >
                                  {invite.inviteeUser.username}
                                </Link>
                                {session &&
                                session.namespace ===
                                  invite.inviteeUser.username ? (
                                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-500 bg-green-100 rounded-full">
                                    You
                                  </span>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </td>

                            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                              <div className="text-center">
                                {moment(invite.createdAt).format("MMM Do YY")}
                              </div>
                            </td>

                            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                              <div className="text-center">{invite.role}</div>
                            </td>

                            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                              <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild>
                                  <svg
                                    className="w-8 h-8 fill-current "
                                    viewBox="0 0 32 32"
                                  >
                                    <circle cx="16" cy="16" r="2" />
                                    <circle cx="10" cy="16" r="2" />
                                    <circle cx="22" cy="16" r="2" />
                                  </svg>
                                </DropdownMenu.Trigger>

                                <DropdownMenu.Portal>
                                  <DropdownMenu.Content
                                    className="DropdownMenuContent"
                                    sideOffset={5}
                                  >
                                    <DropdownMenu.Item
                                      className="DropdownMenuItem"
                                      onClick={() =>
                                        setOpen({
                                          id: invite.id,
                                          name: invite.invitedUser.username
                                        })
                                      }
                                    >
                                      Cancel Invite
                                      <div className="RightSlot"></div>
                                    </DropdownMenu.Item>
                                  </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                              </DropdownMenu.Root>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { organizationName } = context.query
  const outgoingInvites = await prisma.memberInvitation.findMany({
    where: {
      organization: {
        name: organizationName
      }
    },
    select: {
      id: true,
      role: true,
      createdAt: true,
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
