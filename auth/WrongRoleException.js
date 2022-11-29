
export default class WrongRoleException extends Error {
    constructor() {
        super();
        this.name = 'WRONG_ROLE_EXCEPTION';
    }
}