import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().nonempty("Tên đăng nhập không được để trống!"),
  password: z
    .string()
    .nonempty("Mật khẩu không được để trống!")
    .min(8, "Mật khẩu phải có tối thiểu 8 ký tự!"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
