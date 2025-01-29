export type User = {
    handle: string
    name: string
    email: string
    _id: string
    description: string
    image: string
    links: string
}

export type UserForm = Pick<User, 'email' | 'name' | 'handle' > & {
    password: string
    password_confirmation : string
}

export type UserLogin = Pick< User, 'email' > & {
    password: ''
}

export type ProfileFile = Pick< User, 'handle' | 'description' >

export type SocialNetwork = {
    id: string
    name: string
    url: string
    enabled: boolean
}

export type DevTreeLink = Pick< SocialNetwork, 'name' | 'url' | 'enabled' >