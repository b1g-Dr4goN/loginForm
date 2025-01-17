import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().nonempty("Tên đăng nhập không được để trống!"),
  password: z.string().nonempty("Mật khẩu không được để trống!").regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
    {
      message:
        "Mật khẩu chứa 8-20 ký tự (A-Z, a-z, chữ số và một ký tự đặc biệt)",
    }
  ),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
