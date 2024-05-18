import { DashboardOutlined, ProjectOutlined, ShopOutlined } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources : IResourceItem[] = [
    {
        name: "dashboard",
        list: "/",
        meta : {
            label : 'Dashboard',
            icon : <DashboardOutlined/>
        }
      },
      {
        name: "companies",
        list: "/companies", // Means that the list action of this resource will be available at /posts in your app
        create: "/companies/create", // Means that the create action of this resource will be available at /posts/create in your app
        edit: "/companies/edit/:id", // Means that the edit action of this resource will be available at /posts/edit/:id in your app
        show: "/companies/show/:id", // Means that the show action of this resource will be available at /posts/show/:id in your app
        meta : {
            label : 'Companies',
            icon : <ShopOutlined/>
        }
      },
      {
        name: "tasks",
        list: "/tasks", // Means that the list action of this resource will be available at /posts in your app
        create: "/tasks/create", // Means that the create action of this resource will be available at /posts/create in your app
        edit: "/tasks/edit/:id", // Means that the edit action of this resource will be available at /posts/edit/:id in your app
        show: "/tasks/show/:id", // Means that the show action of this resource will be available at /posts/show/:id in your app
        meta : {
            label : 'Tasks',
            icon : <ProjectOutlined/>
        }
      },
]