import {create} from "zustand"

const useJobSeekerStore = create((set)=>({
    formData:{
        name:"",
        email:"",
        phone:"",
        address:"",
        city:"",
        state:"",
        country:"",
        Age:"",
        education:"",
        experience:"",
        skills:"",
        social_links:[]
    },
    setFormData:(newFormData)=>set((state)=>({
        formData:{
            ...state.formData,
            ...newFormData
        }
    })),
    editProfile:false,
    setEditProfile:(newEditProfile)=>set({editProfile:newEditProfile}),
    inputFieldDisabled:true,
    setInputFieldDisabled:(newInputFieldDisabled)=>set({inputFieldDisabled:newInputFieldDisabled}),
    allJobs:[],
    setAllJobs:(newAllJobs)=>set({allJobs:newAllJobs})
}))

export default useJobSeekerStore