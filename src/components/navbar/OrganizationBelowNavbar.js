import BelowNavbar from "./BelowNavbar"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBug,
  faEnvelope,
  faPaperPlane,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons"

const OrganizationBelowNavbar = ({ namespaceName }) => {
  return (
    <BelowNavbar>
      <BelowNavbar.BreadcrumbLinks>
        <BelowNavbar.BreadcrumbLink>
          <Link href={`/${namespaceName}`}>{namespaceName}</Link>
        </BelowNavbar.BreadcrumbLink>
      </BelowNavbar.BreadcrumbLinks>

      <BelowNavbar.MenuList>
        <BelowNavbar.MenuListItem href={`/${namespaceName}/`}>
          <div>
            <FontAwesomeIcon icon={faBug} />
          </div>
          <div className="pl-2">Projects</div>
        </BelowNavbar.MenuListItem>

        <BelowNavbar.MenuListItem href={`/orgs/${namespaceName}/members`}>
          <div>
            <FontAwesomeIcon icon={faUserGroup} />
          </div>
          <div className="pl-2">Members</div>
        </BelowNavbar.MenuListItem>

        <BelowNavbar.MenuListItem href={`/orgs/${namespaceName}/invite`}>
          <div>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div className="pl-2">Invite</div>
        </BelowNavbar.MenuListItem>

        <BelowNavbar.MenuListItem href={`/orgs/${namespaceName}/members/invites`}>
          <div>
            <FontAwesomeIcon icon={faPaperPlane} />
          </div>
          <div className="pl-2">Outgoing Invites</div>
        </BelowNavbar.MenuListItem>

      </BelowNavbar.MenuList>
    </BelowNavbar>
  )
}

export default OrganizationBelowNavbar