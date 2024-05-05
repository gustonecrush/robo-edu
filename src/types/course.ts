export type Course = {
  id: number
  judul_course: string
  deskripsi_course: string
  detail_course: string
  video_course: VideoCourse[]
  total_durasi_video_course: number
  soal_course: SoalCourse[]
}

export type VideoCourse = {
  id: number
  judul_video: string
  durasi_video: number
  file_video: string
  cover_video: string
  deskripsi_video: string
}

export type SoalCourse = {
  id: number
  soal: string
  jawaban: string
}
