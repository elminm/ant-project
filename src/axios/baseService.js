import { axiosBase } from "./axiosBase";
export const baseService = {
  getAll: async (endpoint) => {
    let responseData = [];

    const res = await axiosBase.get(endpoint);
    responseData = res.data;
    return responseData;
  },
  //   delete: async (endpoint, id) => {
  //     let responseData = {};

  //     await axiosBase.delete(endpoint + "/" + id).then((res) => {
  //       responseData = res.data;
  //     });

  //     return responseData;
  //   },
};
