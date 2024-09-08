export const pathService = {
  auth: {
    confirm: {
      url: "/auth/confirm",
    },
  },
  login: {
    url: "/login",
  },
  school: {
    url: "/school",
    new: {
      url: "/school/new",
    },
  },
  profile: {
    url: "/profile",
    edit: {
      url: "/profile/edit",
    },
  },
} as const;
