export class Validator{
    private static DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

    public validateString(str: string, strName: string, maxLength: number): void {
        if (typeof str !== 'string' || str.trim().length === 0) {
            throw new Error(`${strName} must be a non-empty string`);
        }
        if (str.length > maxLength) {
            throw new Error(`${strName} exceeds the maximum length of ${maxLength} characters`);
        }
    }

    public validateDate(date: string): void {
        if (!Validator.DATE_REGEX.test(date)) {
            throw new Error('Publication date must be in the format YYYY-MM-DD');
        }
        if (isNaN(new Date(date).getTime())) {
            throw new Error('Invalid publication date');
        }
    }

    public validadeID(id: number):void {
        if(isNaN(id) || id <= 0){
            throw new Error('ID must be a positive integer');
        }
    }
}