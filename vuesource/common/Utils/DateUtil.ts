export class DateUtil {
  constructor(){}
  getCurrentMonthFirst(date: Date) {
    const d:Date =new Date(date) ;
        d.setDate(1);
        return d;
    }
    getCurrentMonthFirstN(date: Date) {
        const d:Date =new Date(date) ;
        d.setDate(1);
        return d;
    }
    getCurrentMonthLast(date: Date) {
        let currentMonth = date.getMonth();
        const nextMonth = ++currentMonth;
        let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        const oneDay = 1000 * 60 * 60 * 24;
        return new Date(nextMonthFirstDay.getTime() - oneDay);
    }
}