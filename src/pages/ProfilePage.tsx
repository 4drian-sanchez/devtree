import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage"
import { ProfileForm, User } from "../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile, uploadProfileImage } from "../api/DevTreeAPI"
import { toast } from "sonner"

export default function ProfilePage() {

    const queryClient = useQueryClient()
    //Obtiene los datos de la cache
    const data : User = queryClient.getQueryData(['user'])!

    //React Hook Form
    const {register, handleSubmit, formState: {errors}} = useForm<ProfileForm>({
        defaultValues: {
            handle: data.handle,
            description: data.description
        }
    })

    //Mutacion para el handle y la descripcion
    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error)=> {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    })

    //Mutacion para la imagen
    const uploadImageMutation = useMutation({
        mutationFn: uploadProfileImage,
        onError: (error)=> {
            toast.error(error.message)
        },
        onSuccess: data => {
            queryClient.invalidateQueries({queryKey: ['user']})
            queryClient.setQueryData(['user'], (prevData : User) => {
                return {
                    ...prevData,
                    image: data.image
                }
            })
        }
    })

    //Funcion para cambiasr la imagen
    const handleChangeImage =(e : React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            uploadImageMutation.mutate(e.target.files[0])   
        }
    }

    //Funcion que toma handleSubmit
    const onSubmit = (formData : ProfileForm) => updateProfileMutation.mutate(formData)

  return (
      <form 
          className="bg-white p-10 rounded-lg space-y-5"
          onSubmit={handleSubmit(onSubmit)}
      >
          <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
          <div className="grid grid-cols-1 gap-2">
              <label
                  htmlFor="handle"
              >Handle:</label>
              <input
                  type="text"
                  className="border-none bg-slate-100 rounded-lg p-2"
                  placeholder="handle o Nombre de Usuario"
                  {
                    ...register('handle', {
                        required: 'El handle es obligatorio'
                    })
                  }
              />
              { errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage> }
          </div>

          <div className="grid grid-cols-1 gap-2">
              <label
                  htmlFor="description"
              >Descripción:</label>
              <textarea
                  className="border-none bg-slate-100 rounded-lg p-2"
                  placeholder="Tu Descripción"
                  {
                    ...register('description', {
                        required: 'La descripcion es obligatoria'
                    })
                  }
              />
              { errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage> }
          </div>

          <div className="grid grid-cols-1 gap-2">
              <label
                  htmlFor="image"
              >Imagen:</label>
              <input
                  id="image"
                  type="file"
                  name="image"
                  className="border-none bg-slate-100 rounded-lg p-2"
                  accept="image/*"
                  onChange={ handleChangeImage }
              />
          </div>

          <input
              type="submit"
              className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
              value='Guardar Cambios'
          />
      </form>
  )
}