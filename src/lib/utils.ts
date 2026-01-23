import { type ClassValue, clsx } from "clsx";
import { formatDistance } from "date-fns";
import { twMerge } from "tailwind-merge";
import {
  adjectives,
  animals,
  type Config,
  uniqueNamesGenerator,
} from "unique-names-generator";

const customConfig: Config = {
  dictionaries: [adjectives, animals],
  separator: "-",
  length: 2,
};

// to get out of calling impure function's rule in eslint
export const getCurrentDate = () => Date.now();

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const generateRandomNames = () => uniqueNamesGenerator(customConfig);

export const getFormatedTime = (beginDate: number, endDate: number) =>
  formatDistance(beginDate, endDate, { addSuffix: true });
