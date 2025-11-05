import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = (...arg: string[]) => {
    return SetMetadata(IS_PUBLIC_KEY, true);
}