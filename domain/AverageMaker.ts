export default class AverageMaker {
    public static make(elements: number, data: Array<number>): Array<number> {
        let ret: Array<number> = [];
        
        for (let index = 0; index < data.length; index++) {
            let start = (index - elements);
            start = start > 0 ? start : 0;

            let lastElements = data.slice(start, index + 1);

            ret.push(lastElements.reduce((previous: number, current: number) => {
                return previous + current;
            }) / elements);
        }

        return ret;
    }
}