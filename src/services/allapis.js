import { commonapi } from "./Commonapi"
import SERVERURL from "./serverUrl"


//brand adding
export const addBrandApi=async(data)=>{
    return await commonapi('post',`${SERVERURL}/add-brand`,data)
}
//brand display of user
export const getBrandApi=async(userid)=>{
    return await commonapi('get',`${SERVERURL}/get-brand/${userid}`,null)
}
//brand for edit
export const TheBrandApi=async(branId)=>{
    return await commonapi('get',`${SERVERURL}/the/brand/${branId}`,null)
}
//rditing the brand
export const editTheBrandApi=async(branId,reqbody)=>{
    return await commonapi('put',`${SERVERURL}/edit/the/brand/${branId}`,reqbody)
}
//deleteing the brand
export const deleteTheBrandApi=async(branId)=>{
    return await commonapi('delete',`${SERVERURL}/delete/brand/${branId}`,null)
}
//model adding for the brand
export const addModelForBrandApi=async(reqbody)=>{
    return await commonapi('post',`${SERVERURL}/add/model/to/brand`,reqbody)
}
//model getting for the brand
export const getBrandModelApi=async(brandId,userId)=>{
    return await commonapi('get',`${SERVERURL}/get/brand/model?brandId=${brandId}&userId=${userId}`,null)
}
//brands per page showing 
export const getBrandPerPageApi=async(brandsPerPage,userId)=>{
    return await commonapi('get',`${SERVERURL}/get/brands?numberOfPages=${brandsPerPage}&userId=${userId}`,null)
}
//display all models and trims
export const getModelAndTrimsApi=async(id,userId)=>{
    return await commonapi('get',`${SERVERURL}/get/model/Trims?brandId=${id}&userId=${userId}`,null)
}
//display the model with its trims
export const getModelWithTrimsApi=async(id,userId,modelName)=>{
    return await commonapi('get',`${SERVERURL}/get/withModelName/Trims?brandId=${id}&userId=${userId}&modelName=${modelName}`,null)
}
//display the model's trim to edit
export const getTheTrimtoEditApi=async(id,modelName,trimName)=>{
    return await commonapi('get',`${SERVERURL}/get/brand/model/theTrim?brandId=${id}&trimName=${trimName}&modelName=${modelName}`,null)
}
//editing the model and trims
export const editModelAndTrimApi=async(id,trimName,modelName,userId,reqbody)=>{
    return await commonapi('put',`${SERVERURL}/update/model/and/trim?brandId=${id}&trimName=${trimName}&modelName=${modelName}&userId=${userId}`,reqbody)
}

export const getTrimsOfModelNameApi=async(modelname)=>{
    return await commonapi('get',`${SERVERURL}/getTrims?modelname=${modelname}`,null)
}
//getting color combination
export const getColorCombApi=async(brandId,modelname,trimname)=>{
    return await commonapi('get',`${SERVERURL}/getColorCombination?brandId=${brandId}&modelname=${modelname}&trimname=${trimname}`,null)
}


//order adding 
export const addOrderApi=async(reqbody)=>{
    return await commonapi('post',`${SERVERURL}/add/order`,reqbody)
}

//deleting Model
export const deleteTheModelApi=async(modelname)=>{
    return await commonapi('delete',`${SERVERURL}/delete/model/${modelname}`,null)
}