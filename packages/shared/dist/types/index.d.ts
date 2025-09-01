export * from "server/src/types";
export type JSONDocumentContent = {
    type?: string;
    attrs?: Record<string, any>;
    content?: JSONDocumentContent[];
    marks?: {
        type: string;
        attrs?: Record<string, any>;
        [key: string]: any;
    }[];
    text?: string;
    [key: string]: any;
};
export type DocumentContentInterface = string | JSONDocumentContent | JSONDocumentContent[] | null;
//# sourceMappingURL=index.d.ts.map