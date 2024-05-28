import { isToday, isYesterday } from "date-fns";
import dateFormatter from "./dateFormatter";


export default function relativeDate(date: Date) {
    return isToday(date) ? '' : isYesterday(date) ? '1 day ago' : dateFormatter(date)
}