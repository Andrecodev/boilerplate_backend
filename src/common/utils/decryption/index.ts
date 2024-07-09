import * as bcrypt from "bcryptjs";

export const decrypt = async (
  data: string,
  hashedData: string
): Promise<boolean> => {
  const result = await bcrypt.compare(data, hashedData);
  return result;
};
