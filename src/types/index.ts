export type User = {
    handle: string
    name: string
    email: string
    _id: string
    description: string
    image: string
    links: string
}

export type UserHandle = Omit< User, '_id' | 'email' >

export type UserForm = Pick<User, 'email' | 'name' | 'handle' > & {
    password: string
    password_confirmation : string
}

export type UserLogin = Pick< User, 'email' > & {
    password: ''
}

export type ProfileForm = Pick< User, 'handle' | 'description' >

export type SocialNetwork = {
    id: number
    name: string
    url: string
    enabled: boolean
}

export type DevTreeLink = Pick< SocialNetwork, 'name' | 'url' | 'enabled' >