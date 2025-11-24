/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";

export async function getPatients(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/patient${queryString ? `${queryString}` : ""}`
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function getPatientById(id:string){
    try {
        const response = await serverFetch.get(`/patient/${id}`);
    const result = await response.json()
    return result
    } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function softDeletePatient(id:string){
   try {
    const response = await serverFetch.delete(`/patient/soft/${id}`);
    const result = await response.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}