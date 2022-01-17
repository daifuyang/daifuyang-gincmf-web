export const getThemeVars = (json: any = {}) => {
    const { vars = {} } = JSON.parse(JSON.stringify(json?.more))
    Object.keys(vars).forEach((key: any) => {
        const item: any = vars[key]
        const { value } = item
        if (value) {
            vars[key] = value
        }
    })
    return vars
}

export const getThemeWidgets = (json: any = {}) => {
    const widgets = JSON.parse(JSON.stringify(json?.more?.widgets))
    Object.keys(widgets).forEach((key: any) => {
        const item = widgets[key]
        Object.keys(item?.vars).forEach((vKey: any) => {
            const vars = item.vars?.[vKey]
            const { value } = vars
            if (value) {
                item.vars[vKey] = value
            }
        })
    })
    return widgets
}