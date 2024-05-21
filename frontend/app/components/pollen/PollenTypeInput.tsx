import Select from "react-select"
import Switch from "react-switch"

type Props = {
    allPollenTypes: string[]
    setDisplayedPollenTypes: (displayedPollenTypes: string[]) => void
    showsDailyTotal: boolean
    setShowsDailyTotal: (isChecked: boolean) => void
}

export default function PollenTypeInput({
    allPollenTypes,
    setDisplayedPollenTypes,
    showsDailyTotal,
    setShowsDailyTotal,
}: Props) {
    return (
        <div className="flex flex-col md:flex-row gap-x-4 gap-y-2 items-start">
            <label className="form-label flex flex-col gap-y-1">
                Show pollen types
                <Select
                    closeMenuOnSelect={false}
                    onChange={(selectedOptions) => setDisplayedPollenTypes(selectedOptions.map(({ value }) => value))}
                    isMulti
                    options={allPollenTypes.map((name) => ({ value: name, label: name }))}
                />
            </label>

            <label className="form-label flex flex-col gap-y-1 shrink-0">
                Show daily total
                <Switch checked={showsDailyTotal} onChange={(isChecked) => setShowsDailyTotal(isChecked)} />
            </label>
        </div>
    )
}
