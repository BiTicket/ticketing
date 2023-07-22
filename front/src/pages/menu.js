const menus = [
  {
    id: 1,
    name: "Home",
    links: "#",
    namesub: [
      {
        id: 1,
        sub: "Home",
        links: "/",
      },
    ],
  },
  {
    id: 2,
    name: "Explore",
    links: "#",
    namesub: [
      {
        id: 4,
        sub: "Explore",
        links: "/explore",
      },
      {
        id: 7,
        sub: "Item Details",
        links: "/item-details",
      },
    ],
  },
  {
    id: 3,
    name: "Event Activity",
    links: "#",
    namesub: [
      {
        id: 1,
        sub: "Event Activity",
        links: "/activity",
      },
      {
        id: 2,
        sub: "Escrow",
        links: "/escrow",
      },
    ],
  },
  {
    id: 4,
    name: "Community",
    links: "#",
    namesub: [
      {
        id: 1,
        sub: "Author",
        links: "/author",
      },
      {
        id: 2,
        sub: "My Profile",
        links: "/my-profile",
      },
      {
        id: 3,
        sub: "Help Center",
        links: "/help-center",
      },
    ],
  },
  {
    id: 5,
    name: "Page",
    links: "#",
    namesub: [
      {
        id: 3,
        sub: "Wallet Connect",
        links: "/wallet-connect",
      },
      {
        id: 4,
        sub: "Create Event",
        links: "/create-item",
      },
      {
        id: 5,
        sub: "Edit Profile",
        links: "/edit-profile",
      },
      {
        id: 7,
        sub: "Login",
        links: "/login",
      },
      {
        id: 8,
        sub: "Sign Up",
        links: "/sign-up",
      },
      {
        id: 9,
        sub: "No Result",
        links: "/no-result",
      },
      {
        id: 10,
        sub: "FAQ",
        links: "/faq",
      },
    ],
  },
];

export default menus;
