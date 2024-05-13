import Select from "react-select"
import Switch from "react-switch"

type Props = {
    allPollenTypes: string[]
    displayPollenTypes: any
    setShowsDailyTotal: (isChecked: boolean) => any
    showsDailyTotal: boolean
}

export default function PollenTypeInput({
    allPollenTypes,
    displayPollenTypes,
    showsDailyTotal,
    setShowsDailyTotal,
}: Props) {
    return (
        <div className="flex gap-8 items-start">
            <label className="form-label flex flex-col">
                Choose pollen types
                <Select
                    closeMenuOnSelect={false}
                    onChange={(selectedOptions) => displayPollenTypes(selectedOptions.map(({ value }) => value))}
                    isMulti
                    options={allPollenTypes.map((name) => ({ value: name, label: name }))}
                />
            </label>

            <label className="form-label flex flex-col">
                Show daily total
                <Switch checked={showsDailyTotal} onChange={(isChecked) => setShowsDailyTotal(isChecked)} />
            </label>
        </div>
    )
}
