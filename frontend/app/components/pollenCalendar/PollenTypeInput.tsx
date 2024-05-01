import Select from "react-select"

export default function PollenTypeInput({
    allPollenTypes,
    showPollenTypes,
}: {
    allPollenTypes: string[]
    showPollenTypes: any
}) {
    return (
        <Select
            closeMenuOnSelect={false}
            onChange={(selectedOptions) => showPollenTypes(selectedOptions.map(({ value }) => value))}
            isMulti
            options={allPollenTypes.map((name) => ({ value: name, label: name }))}
        />
    )
}
