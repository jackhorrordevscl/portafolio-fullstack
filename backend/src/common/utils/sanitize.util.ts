import sanitizeHtml from "sanitize-html";

export const sanitizeInput = (input: string): string => {
    return sanitizeHtml(input, {
        allowedTags: [], //ELIMINA EL HTML
        allowedAttributes: {},
        disallowedTagsMode: 'discard',
    }).trim();
};