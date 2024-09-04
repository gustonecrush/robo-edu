export type Category = {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export type Contributor = {
  id: number
  username: string
}

export type Module = {
  id: string
  name: string
  category: Category
  contributor: Contributor
  created_at: string
  updated_at: string
  file: string
}

export type Video = {
  id: string
  name: string
  desc: string
  module: Module
  file: string
  duration: string
}
