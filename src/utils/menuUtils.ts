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
        label: "Staff",
        href: "/dash/staff",
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
        icon: "icon-lightbulb",
        label: "Subjects",
        href: "/dash/subjects",
        visible: ["admin"],
      },
      {
        icon: "icon-grid",
        label: "Classes",
        href: "/dash/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "icon-book-open",
        label: "Lessons",
        href: "/dash/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "icon-gift-1",
        label: "Exams",
        href: "/dash/exams",
        visible: ["*"],
      },
      {
        icon: "icon-stopwatch",
        label: "Assignments",
        href: "/dash/assignments",
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
        href: "/events",
        visible: ["*"],
      },
      {
        icon: "icon-mail-1",
        label: "Messages",
        href: "/messages",
        visible: ["*"],
      },
      {
        icon: "icon-bullhorn",
        label: "Announcement",
        href: "/announcement",
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
