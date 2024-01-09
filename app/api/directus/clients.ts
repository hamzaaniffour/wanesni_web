import { authentication, createDirectus, realtime, rest } from '@directus/sdk';
console.log(process.env.BASE_URL);
const directus = createDirectus(`${process.env.BASE_URL}`).with(authentication()).with(rest()).with(realtime());
export default directus;