export const useUtilities = () => {
    const toCapitalize = (string: string):string => {
        return string && string.charAt(0).toUpperCase() + string.slice(1) || "";
    }

    const logInLoading = false;

    return {
        toCapitalize,logInLoading
    }
}