export function drizzleEnumToObject(enumValues) {
    return enumValues.reduce((acc, value) => {
        acc[value] = value;
        return acc;
    }, {});
}
