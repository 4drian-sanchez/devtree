import { isAxiosError } from "axios"
import api from "../config/axios"
import { ProfileForm} from "../types"

export const getUser = async () => {
    try {
        const { data } = await api('/user')
        return data.user
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const updateProfile = async (formData: ProfileForm) => {
    try {
        const { data } = await api.patch<string>('/user', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const uploadProfileImage = async (file: File) => {
    let formData = new FormData()
    formData.append('file', file)
    try {
        const {data} = await api.post('/user/image', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}