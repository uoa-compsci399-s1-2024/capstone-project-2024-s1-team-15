import Select from "react-select"

export default function PollenTypeInput({
    allPollenTypes,
    displayPollenTypes,
}: {
    allPollenTypes: string[]
    displayPollenTypes: any
}) {
    return (
        <Select
            closeMenuOnSelect={false}
            onChange={(selectedOptions) => displayPollenTypes(selectedOptions.map(({ value }) => value))}
            isMulti
            options={allPollenTypes.map((name) => ({ value: name, label: name }))}
        />
    )
}