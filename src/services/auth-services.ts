import moment, { min } from 'moment';

export function validateExpires({ expires }: { expires: Date }) {
    const now = new Date();

    const expiresDate = new Date(expires);

    const difference = moment(now).diff(moment(expiresDate));

    const minutes = moment.duration(difference).asMinutes();

    return (minutes < 60 ? true : false);
}