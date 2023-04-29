import { IList } from "@/components/AutoComplete";

export default class CommonUtils {
    static getFilteredList(list: IList[], searchString: string) {
        return list.filter((value) =>
            value.displayName.toLowerCase().includes(searchString.toLowerCase())
        );
    }
}
