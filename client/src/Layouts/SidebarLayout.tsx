import { useLogout } from "@authfunctions/react";
import {
  BellIcon,
  CalendarIcon,
  ChartSquareBarIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  DatabaseIcon,
  DocumentTextIcon,
  HomeIcon,
  LogoutIcon,
  MailIcon,
} from "@heroicons/react/outline";
import { CogIcon, UserIcon } from "@heroicons/react/solid";
import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "../Components/Dropdown";
import Navbar from "../Components/Navbar";
import Sidebar, { DesktopOrMobile } from "../Components/Sidebar";

interface SideBarLayoutProps {
  children: ReactElement | ReactElement[];
  sidebarCurrent: string;
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  setSidebarCurrent: Dispatch<SetStateAction<string>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

interface SideBarContentProps {
  sidebarCurrent: string;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  type: DesktopOrMobile;
}

interface Link {
  Icon: FC;
  name: string;
  to: string;
}

interface SecondaryLink {
  name: string;
  to: string;
}

const Navigation: Link[] = [
  {
    Icon: HomeIcon,
    name: "Dashboard",
    to: "/",
  },
  {
    Icon: MailIcon,
    name: "E-Mails",
    to: "/mails",
  },
  {
    Icon: ChartSquareBarIcon,
    name: "Provision",
    to: "/provision",
  },
  {
    Icon: ClipboardCheckIcon,
    name: "Aufgaben",
    to: "/tasks",
  },
  {
    Icon: CalendarIcon,
    name: "Kalender",
    to: "/calendar",
  },
  {
    Icon: DocumentTextIcon,
    name: "Dokumente",
    to: "/documents",
  },
  {
    Icon: DatabaseIcon,
    name: "Alt-IT Datenbanken",
    to: "/alt-it",
  },
  {
    Icon: ClipboardListIcon,
    name: "Sammelwettbewerb",
    to: "/sammelwettbewerb",
  },
];

const SecondaryNavigation: SecondaryLink[] = [
  {
    name: "Test",
    to: "/test",
  },
];

export default function SidebarLayout({
  children,
  setSidebarOpen,
  sidebarOpen,
  sidebarCurrent,
  setSidebarCurrent,
  search,
  setSearch,
}: SideBarLayoutProps): ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const logoutFunction = useLogout(navigate);

  useEffect(() => {
    setSidebarCurrent(location.pathname);
  }, [location, setSidebarCurrent]);

  async function onLogout() {
    const [err, code, navigator] = await logoutFunction();
    if (!err) navigator();
  }

  return (
    <Sidebar>
      <Sidebar.Mobile sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        <SideBarContent
          sidebarCurrent={sidebarCurrent}
          setSidebarOpen={setSidebarOpen}
          type="mobile"
        />
      </Sidebar.Mobile>
      <Sidebar.Desktop>
        <SideBarContent
          sidebarCurrent={sidebarCurrent}
          setSidebarOpen={setSidebarOpen}
          type="desktop"
        />
      </Sidebar.Desktop>
      <Sidebar.Content>
        <Navbar>
          <Navbar.SidebarButton setSidebarOpen={setSidebarOpen} />
          <Navbar.ContentWrapper1>
            <Navbar.Searchbar
              search={search}
              setSearch={setSearch}
              onSubmit={() => {}}
            />
            <Navbar.ContentWrapper2>
              <Navbar.IconButton Icon={BellIcon} />
              <Dropdown>
                <Dropdown.Button border={false}>
                  <span className="hidden lg:block">Laurenz Rausche</span>
                </Dropdown.Button>
                <Dropdown.Content>
                  <Dropdown.Info
                    largeText="Laurenz Rausche"
                    smallText="Angemeldet als"
                  />
                  <Dropdown.Section>
                    <Dropdown.Link
                      Icon={UserIcon}
                      text="Mein Profil"
                      to="/profile"
                    />
                    <Dropdown.Link
                      Icon={CogIcon}
                      text="Einstellungen"
                      to="/settings"
                    />
                  </Dropdown.Section>
                  <Dropdown.Section>
                    <Dropdown.Link
                      Icon={LogoutIcon}
                      text="Logout"
                      to=""
                      onClick={onLogout}
                    />
                  </Dropdown.Section>
                </Dropdown.Content>
              </Dropdown>
            </Navbar.ContentWrapper2>
          </Navbar.ContentWrapper1>
        </Navbar>
        <>{children}</>
      </Sidebar.Content>
    </Sidebar>
  );
}

function SideBarContent({
  type,
  setSidebarOpen,
  sidebarCurrent,
}: SideBarContentProps) {
  return (
    <>
      <Sidebar.Header>
        <Sidebar.HeaderText text="mk:return ISP" />
      </Sidebar.Header>
      <Sidebar.Navigation type={type}>
        <Sidebar.Links>
          {Navigation.map((item, idx) => (
            <Sidebar.Link
              key={idx}
              setSidebarOpen={setSidebarOpen}
              Icon={item.Icon}
              name={item.name}
              to={item.to}
              current={sidebarCurrent === item.to}
              type={type}
            />
          ))}
        </Sidebar.Links>
        <Sidebar.SecondaryLinks title="Secondary">
          {SecondaryNavigation.map((item, idx) => (
            <Sidebar.SecondaryLink
              key={idx}
              setSidebarOpen={setSidebarOpen}
              name={item.name}
              to={item.to}
              type={type}
            />
          ))}
        </Sidebar.SecondaryLinks>
      </Sidebar.Navigation>
    </>
  );
}
