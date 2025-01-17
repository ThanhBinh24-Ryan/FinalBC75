export type TypeRoute = {
    path: string,
    element: any,
    nested? :TypeRoute[],
}