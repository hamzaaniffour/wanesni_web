
import Cookies from "js-cookie"
import { authentication, createDirectus, realtime, rest, readMe, refresh } from '@directus/sdk';


class LocalStorage {
    get() {
        if(Cookies.get('a_t')){
            return JSON.parse(Cookies.get('a_t')!);
        }
    }
    set(data: any) {
      Cookies.set("a_t", JSON.stringify(data));
  }
  }

const directus = createDirectus(`${process.env.BASE_URL}`).with(authentication('json', { storage: new LocalStorage() })).with(rest({ credentials: 'include' })).with(realtime()).with(readMe());
export default directus;