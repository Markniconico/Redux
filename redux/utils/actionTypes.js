import { getRandomString } from './utils.js';

export default {
    INIT() {
        return `@@redux/INIT${getRandomString(6)}`;
    },
    UNKNOWN() {
        return `@@redux/PROBE_UNKNOWN_ACTION${getRandomString(6)}`;
    },
};
