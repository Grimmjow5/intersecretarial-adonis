import {DateTime} from "luxon"

const timeNowPosh = ()=>{
    return DateTime.now().toMillis();
}
export default timeNowPosh;