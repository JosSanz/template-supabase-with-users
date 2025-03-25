const Routes = {
    root: "/",
    signIn: "/sign-in",
    reset_password: '/auth/reset_password',
    forgot_password: '/forgot-password',
    home: "/system",
    profile: {
        info: '/system/profile/info',
        change_password: '/system/profile/change_password'
    },
    user_profiles: {
        list: "/system/config/user-profiles",
        create: "/system/config/user-profiles/create",
        update: "/system/config/user-profiles/update",
        api: "/api/user-profiles"
    },
    users: {
        list: "/system/config/users",
        create: "/system/config/users/create",
        update: "/system/config/users/update",
        api: "/api/users"
    },
};

export default Routes;