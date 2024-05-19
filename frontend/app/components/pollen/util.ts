import dayjs from "dayjs"

export function makeTimestampForDateMidday(timestamp: number) {
    return dayjs(timestamp).set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0).valueOf()
}
