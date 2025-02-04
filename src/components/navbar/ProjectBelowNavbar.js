import BelowNavbar from "./BelowNavbar"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import {
  faBug,
  faTag,
  faEnvelope,
  faUserGroup,
  faPlus
} from "@fortawesome/free-solid-svg-icons"

const ProjectBelowNavbar = ({namespaceName, projectName, selected}) => {
  const router = useRouter()
  return (
    <BelowNavbar>
    <BelowNavbar.BreadcrumbLinks>
      <BelowNavbar.BreadcrumbLink>
        <Link href={`/${namespaceName}`}>
          {namespaceName}
        </Link>
      </BelowNavbar.BreadcrumbLink>

      <BelowNavbar.BreadcrumbLink>
        <Link href={`/${namespaceName}/${projectName}`}>
          {projectName}
        </Link>
      </BelowNavbar.BreadcrumbLink>
    </BelowNavbar.BreadcrumbLinks>

    <BelowNavbar.MenuList selected={selected}>

      <BelowNavbar.MenuListItem id={"issues"} href={`/${namespaceName}/${projectName}`}>
        <div>
          <FontAwesomeIcon icon={faBug} />
        </div>
        <div className="pl-2">Issues</div>
      </BelowNavbar.MenuListItem>

      <BelowNavbar.MenuListItem id={"labels"} href={`/${namespaceName}/${projectName}/labels`}>
        <div>
          <FontAwesomeIcon icon={faTag} />
        </div>
        <div className="pl-2">Labels</div>
      </BelowNavbar.MenuListItem>

      <BelowNavbar.MenuListItem id={"members"} href={`/${namespaceName}/${projectName}/members`}>
        <div>
          <FontAwesomeIcon icon={faUserGroup} />
        </div>
        <div className="pl-2">Members</div>
      </BelowNavbar.MenuListItem>

      <BelowNavbar.MenuListItem id={"invites"} href={`/${namespaceName}/${projectName}/invite`}>
        <div>
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <div className="pl-2">Invites</div>
      </BelowNavbar.MenuListItem>

      {/* <BelowNavbar.MenuListItem id={"createIssue"} href={`/${namespaceName}/${projectName}/new`}>
        <div>
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div className="pl-2">Create Issue</div>
      </BelowNavbar.MenuListItem> */}

    </BelowNavbar.MenuList>
  </BelowNavbar>
  )
}

export default ProjectBelowNavbar;
