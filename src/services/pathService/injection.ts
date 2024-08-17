export const pathService = {
  auth: {
    confirm: {
      url: "/auth/confirm",
    },
  },
  login: {
    url: "/login",
  },
  profile: {
    url: "/profile",
    edit: {
      url: "/profile/edit",
    },
  },
} as const;
