export const getThemeVars = (json: any = {}) => {

    if(Object.keys(json).length === 0) {
        return null
    }

    const { vars = {} } = JSON.parse(JSON.stringify(json?.more))
    // Object.keys(vars).forEach((key: any) => {
    //     const item: any = vars[key]
    //     const { value } = item
    //     if (value !== undefined) {
    //         vars[key] = value
    //     }
    // })
    return vars
}

export const getThemeWidgets = (json: any = {}) => {

    if(Object.keys(json).length === 0) {
        return {}
    }

    const widgets = json?.more?.widgets
    let result:any = {}


    if(widgets){
    result = JSON.parse(JSON.stringify(widgets))
}
    // Object.keys(widgets).forEach((key: any) => {
    //     const item = widgets[key]
    //     Object.keys(item?.vars).forEach((vKey: any) => {
    //         const vars = item.vars?.[vKey]
    //         const { value } = vars
    //         if (value !== undefined) {
    //             item.vars[vKey] = value
    //         }
    //     })
    // })
    return result
}

export const getVarsAttr = (vars: any, varName: string, key: string = 'value') => {
    return vars?.[varName]?.[key]
}

export const getWidgetsAttr = (widgets: any, widget: string, key: string = 'value') => {
    return widgets?.vars?.[widget]?.[key]
}

export const getDataBySort = (object: any) => {
    let resultData = Object.keys(object).map((key: string) => {
        const item = {...object[key]};
        item.key = key;
        return item;
    });

    resultData = resultData.sort((a: any, b: any) => {
        return a.order - b.order;
    });

    return resultData
}