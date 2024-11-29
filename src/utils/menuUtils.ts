export const role = "admin";
export const menuItems = [
  {
    title: "Menu",
    items: [
      {
        icon: "icon-home-outline",
        label: "Home",
        href: "/admin",
        visible: ["*"],
      },

      {
        icon: "icon-graduation-cap-1",
        label: "Inbox",
        href: "/inbox",
        visible: ["admin", "teacher"],
      },
      {
        icon: "icon-graduation-cap",
        label: "Work",
        href: "/work",
        visible: ["admin", "teacher"],
      },
      {
        icon: "icon-users",
        label: "Spaces",
        href: "/favs",
        visible: ["admin", "teacher"],
      },
      {
        visible: ["*"],
        label: "Lists",
        href: "/lst",
        icon: "icon-stopwatch",
        sub: true,
        items: [
          {
            icon: "icon-lightbulb",
            label: "Subjects",
            href: "/lst/subjects",
            visible: ["admin"],
          },
          {
            icon: "icon-eye",
            label: "Teachers",
            href: "/lst/teachers",
            visible: ["admin"],
          },
          {
            icon: "icon-users-outline",
            label: "Students",
            href: "/lst/students",
            visible: ["admin"],
          },
          {
            icon: "icon-users",
            label: "Parents",
            href: "/lst/parents",
            visible: ["admin"],
          },
          {
            icon: "icon-grid",
            label: "Classes",
            href: "/lst/classes",
            visible: ["admin", "teacher"],
          },
          {
            icon: "icon-book-open",
            label: "Lessons",
            href: "/lst/lessons",
            visible: ["admin", "teacher"],
          },
        ],
      },
      {
        visible: ["*"],
        href: "/",
        label: "Checklist",
        icon: "icon-light-up",
        sub: true,
        items: [
          {
            icon: "icon-gift-1",
            label: "Exams",
            href: "/lst/exams",
            visible: ["*"],
          },
          {
            icon: "icon-stopwatch",
            label: "Assignments",
            href: "/lst/assignments",
            visible: ["*"],
          },
          {
            icon: "icon-mail-1",
            label: "Results",
            href: "/lst/results",
            visible: ["*"],
          },
          {
            icon: "icon-th-list",
            label: "Attendance",
            href: "/lst/attendance",
            visible: ["*"],
          },
          {
            icon: "icon-calendar",
            label: "Events",
            href: "/lst/events",
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
        href: "/announcements",
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
