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
      }
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
    name: "Activity",
    links: "#",
    namesub: [
      {
        id: 1,
        sub: "Activity",
        links: "/activity",
      }
    ],
  },
  {
    id: 4,
    name: "Community",
    links: "#",
    namesub: [
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
        id: 2,
        sub: "Authors 02",
        links: "/authors",
      },
      {
        id: 3,
        sub: "Wallet Connect",
        links: "/wallet-connect",
      },
      {
        id: 4,
        sub: "Create Item",
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
  {
    id: 7,
    name: "Contact",
    links: "/contact",
    namesub: [
      {
        id: 2,
        sub: "Contact 2",
        links: "/contact",
      },
    ],
  },
];

export default menus;
