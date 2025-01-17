import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().nonempty("Tên đăng nhập không được để trống!"),
  degreeName: z.string().nonempty("Học vị không được để trống!"),
  email: z
    .string()
    .email("Email không đúng định dạng")
    .nonempty("Email không được để trống!"),
  facultyOrDepartment: z.string().nonempty("Khoa phòng không được để trống"),
  fullName: z.string().nonempty("Tên người dùng không được để trống!"),
  password: z
    .string()
    .nonempty("Mật khẩu không được để trống!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      {
        message:
          "Mật khẩu chứa 8-20 ký tự (A-Z, a-z, chữ số và một ký tự đặc biệt)",
      }
    ),
  phone: z
    .string()
    .nonempty("Điện thoại không được để trống!")
    .regex(/^(0|\\+84)[3-9][0-9]{8}$/, {
      message: "Số điện thoại không hợp lệ!",
    }),
  role: z.string(),
  status: z.boolean(),
  subject: z.string().nonempty("Đối tượng không được để trống!"),
  systemLevel: z.number({ message: "Cấp người dùng phải là một số!" }),
});

export type TCreateUserSchema = z.infer<typeof createUserSchema>;
