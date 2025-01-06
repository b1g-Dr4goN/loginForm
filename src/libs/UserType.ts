import { z } from "zod";

export const userSchema = z.object({
  userId: z.number(),
  username: z.string().nonempty("Tên đăng nhập không được để trống!"),
  degreeName: z.string().nonempty("Học vị không được để trống!"),
  email: z.string().email("Email không đúng định dạng").nonempty("Email không được để trống!"),
  falcultyOrDepartment: z.string().nonempty("Khoa phòng không được để trống"),
  fullName: z.string().nonempty("Tên người dùng không được để trống!"),
  password: z.string().nonempty("Mật khẩu không được để trống!").min(8, "Mật khẩu phải có tối thiểu 8 ký tự!"),
  phone: z.string().nonempty("Điện thoại không được để trống!"),
  role: z.string(),
  status: z.boolean(),
  subject: z.string().nonempty("Đối tượng không được để trống!"),
  systemLevel: z.number(),
  tasks: z.string().array(),
})

export type TUserSchema = z.infer<typeof userSchema>