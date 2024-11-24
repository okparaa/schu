export const role = "admin";
export const menuItems = [
  {
    title: "Menu",
    items: [
      {
        icon: "icon-home-outline",
        label: "Home",
        href: "/dash/admin",
        visible: ["*"],
      },

      {
        icon: "icon-graduation-cap-1",
        label: "Teachers",
        href: "/dash/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "icon-graduation-cap",
        label: "Students",
        href: "/dash/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "icon-users",
        label: "Parents",
        href: "/dash/parents",
        visible: ["admin", "teacher"],
      },
      {
        visible: ["*"],
        label: "Catalog",
        href: "/dash/subjects",
        icon: "icon-stopwatch",
        sub: true,
        items: [
          {
            icon: "icon-lightbulb",
            label: "Subjects",
            href: "/dash/list/subjects",
            visible: ["admin"],
          },
          {
            icon: "icon-eye",
            label: "Teachers",
            href: "/dash/list/teachers",
            visible: ["admin"],
          },
          {
            icon: "icon-users-outline",
            label: "Students",
            href: "/dash/list/students",
            visible: ["admin"],
          },
          {
            icon: "icon-users",
            label: "Parents",
            href: "/dash/list/parents",
            visible: ["admin"],
          },
          {
            icon: "icon-grid",
            label: "Classes",
            href: "/dash/list/classes",
            visible: ["admin", "teacher"],
          },
          {
            icon: "icon-book-open",
            label: "Lessons",
            href: "/dash/list/lessons",
            visible: ["admin", "teacher"],
          },
        ],
      },
      {
        visible: ["*"],
        href: "/dash/exams",
        label: "Checklist",
        icon: "icon-light-up",
        sub: true,
        items: [
          {
            icon: "icon-gift-1",
            label: "Exams",
            href: "/dash/list/exams",
            visible: ["*"],
          },
          {
            icon: "icon-stopwatch",
            label: "Assignments",
            href: "/dash/list/assignments",
            visible: ["*"],
          },
          {
            icon: "icon-mail-1",
            label: "Results",
            href: "/dash/list/results",
            visible: ["*"],
          },
          {
            icon: "icon-th-list",
            label: "Attendance",
            href: "/attendance",
            visible: ["*"],
          },
          {
            icon: "icon-calendar",
            label: "Events",
            href: "/dash/list/events",
            visible: ["*"],
          },
        ],
      },
      {
        icon: "icon-mail-1",
        label: "Messages",
        href: "/messages",
        visible: ["*"],
      },
      {
        icon: "icon-bullhorn",
        label: "Announcements",
        href: "/dash/list/announcements",
        visible: ["*"],
      },
    ],
  },
  {
    title: "Other",
    items: [
      {
        icon: "icon-user-o",
        label: "Profile",
        href: "/profile",
        visible: ["*"],
      },
      {
        icon: "icon-cog-1",
        label: "Setting",
        href: "/setting",
        visible: ["*"],
      },
      {
        icon: "icon-off-1",
        label: "Logout",
        href: "/logout",
        visible: ["*"],
      },
    ],
  },
];
