export const roles = {
  COMMOM: "",
  USER: "ROLE_USER",
  ADM: "ROLE_ADM",
};

export const mapPathRoles = {
  TAREFAS: {
    GET_ALL: [roles.ADM],
    GET_ID: [roles.ADM],
    POST: [roles.USER, roles.ADM],
    PUT: [roles.USER, roles.ADM],
    DELETE_ID: [roles.ADM],    
  },
  USUARIOS: {
    GET_ALL: [roles.ADM],
    GET_ID: [roles.USER, roles.ADM],
    POST: [roles.COMMOM, roles.USER, roles.ADM],
    PUT: [roles.USER, roles.ADM],
    DELETE_ID: [roles.ADM],

    GET_ALL_TASK: [roles.USER, roles.ADM],
    GET_ID_TASK: [roles.USER, roles.ADM],
    POST_TASK: [roles.USER, roles.ADM],
    PUT_TASK: [roles.USER, roles.ADM],
    DELETE_ID_TASK: [roles.USER, roles.ADM],
  },
};
