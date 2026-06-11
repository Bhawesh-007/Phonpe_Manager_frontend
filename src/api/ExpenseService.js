import apiClient from "./axiosConfig";
export const fetchMyExpenses = async() => {
    try{
        const response = await apiClient.get('/expenses/getexpenses')
        return response.data
    }
    catch(error){
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
}
export const addExpense = async(expenseData) => {
     try{
        const response = await apiClient.post('/expenses/add' , expenseData)
        return response.data
     }
     catch(error){
        throw new Error(error.response?.data?.message || "Something went wrong");
     }
}


    