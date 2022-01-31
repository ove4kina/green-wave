import {format, differenceInCalendarDays} from 'date-fns'

export const schedules = {
    data() {
        return {}
    },
    mounted() {

    },
    methods: {
        compareDays(targetEnd, currentEnd) {
            let targetDays = this.generateTagTime(targetEnd),
                currentDays = this.generateTagTime(currentEnd);
            return targetDays > currentDays;
        },
        calculateProperties(item) {
            let scheduleTarget = null,
                nearToStart = false;
            item.schedules.map((schedule, index) => {
                if (this.isWithinRange(schedule.date_register_start, schedule.date_register_end) === 'included') {
                    if (scheduleTarget !== null) {
                        if (this.compareDays(scheduleTarget.date_register_end, schedule.date_register_end)) {
                            scheduleTarget = schedule;
                        }
                    } else {
                        scheduleTarget = schedule;
                    }
                }
            });
            if (scheduleTarget === null) {
                item.schedules.map((schedule, index) => {
                    if (this.isWithinRange(schedule.date_register_start, schedule.date_register_end) === 'includedBefore') {
                        if (scheduleTarget !== null) {
                            if (this.compareDays(scheduleTarget.date_register_start, schedule.date_register_start)) {
                                scheduleTarget = schedule;
                            }
                        } else {
                            scheduleTarget = schedule;
                            nearToStart = true;
                        }
                    }
                });
            }
            if (scheduleTarget) {
                if (nearToStart) {
                    return this.generateTagString(this.generateTagTime(scheduleTarget.date_register_start), nearToStart, scheduleTarget.date_register_start);
                } else {
                    return this.generateTagString(this.generateTagTime(scheduleTarget.date_register_end), nearToStart, scheduleTarget.date_register_end);
                }
            }
            return false;
        },
        isWithinRange(start, end) {
            let currentDate = new Date(),
                dateStart = new Date(start),
                dateEnd = new Date(end);

            if (dateStart < currentDate && dateEnd > currentDate) {
                return 'included';
            }
            if (dateStart > currentDate && dateEnd > currentDate) {
                return 'includedBefore';
            }
            return;
        },
        generateTagTime(date) {
            return differenceInCalendarDays(new Date(date), new Date);
        },
        generateTagString(days, nearToStart, date) {
            let formatDate = format(new Date(date), 'dd.MM');
            if (nearToStart) {
                return {
                    name: `Набор с ${formatDate}`,
                    color: 'yellow-bright'
                }
            } else {
                if (days <= 10) {
                    return {
                        name: `Остал${this.declOfNum(days === 0 ? 1 : days, ['ся', 'ось', 'ось'])} ${days === 0 ? 1 : days} д${this.declOfNum(days === 0 ? 1 : days, ['ень', 'ня', 'ней'])} на запись`,
                        color: 'pink'
                    }
                } else {
                    return {
                        name: `Идет набор до ${formatDate}`,
                        color: 'yellow-bright'
                    }
                }
            }
        },
        declOfNum(number, titles) {
            let cases = [2, 0, 1, 1, 1, 2];
            return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
        }
    }
}