import api from "./base";

export const loginApi = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/auth/signin", payload);
    const user = response.data.content.user
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('userToken', JSON.stringify(response.data.content.token))
    return user
  } catch (error: any) {
    throw error.response.data;
  }
};

export const signUpApi = async (payload: {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
  skill: string[];
  certification: string[];
}) => {
  try {
    const response = await api.post("/auth/signup", payload);
    return response.data.content;
  } catch (error: any) {
    throw error.response.data.content;
  }
};

export const addAdminApi = async (payload: {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
  skill: string[];
  certification: string[];
}) => {
  try {
    const response = await api.post("/users", payload);
    return response.data.content;
  } catch (error: any) {
    throw error.response.data;
  }
};


export const getAllUsersApi = async () => {
  try {
    const response = await api.get("/users");
    return response.data.content;
  } catch (error: any) {
    throw error.response.data;
  }
}

export const getAllUsersByPageIndex = async (pageIndex: number) => {
  try {
    const response = await api.get(`/users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=10`);
    return response.data.content.data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export const updateUserApi = async ({ userId, payload }: { userId: number, payload: {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
  skill: string[];
  certification: string[];
}}) => {
  try {
    const response = await api.put(`/users/${userId}`, payload);
    return response.data.content;
  } catch (error: any) {
    throw error.response.data;
  }
};


export const deleteUserApi = async (id: number) => {
  try {
    const response = await api.delete(`/users/?id=${id}`);
    return response.data.content;
  } catch (error: any) {
    throw error.response.data;
  }
}
