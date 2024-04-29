import dayjs from "dayjs"

export default function DateInput({ lowerLimit, upperLimit, setUpperLimit, setLowerLimit }: any) {
    const lowerLimitString = dayjs(lowerLimit).format("YYYY-MM-DD")
    const upperLimitString = dayjs(upperLimit).format("YYYY-MM-DD")

    return (
        <div>
            <label className="form-label">
                From
                <input
                    className="form-input"
                    type="date"
                    defaultValue={lowerLimitString}
                    onChange={(e) => setLowerLimit(e.target.valueAsNumber)}
                />
            </label>

            <label className="form-label">
                to
                <input
                    className="form-input"
                    type="date"
                    defaultValue={upperLimitString}
                    onChange={(e) => setUpperLimit(e.target.valueAsNumber)}
                />
            </label>
        </div>
    )
}
