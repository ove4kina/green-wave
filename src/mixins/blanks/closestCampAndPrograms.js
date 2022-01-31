import { differenceInCalendarDays } from 'date-fns';

export const closestCampAndPrograms = {
    methods: {
        getClosestCampsAndPrograms(camps,programs) {
            let currentDate = new Date(),
                result = [],
                flagIn = false,
                dateStart = null;
            camps.map((camp) => {
                flagIn = false;
                camp.schedules.map((schedule) => {
                    let diffInDays = differenceInCalendarDays(new Date(schedule.date_register_end), currentDate);
                    if(diffInDays > 0) {
                        flagIn = true;
                        dateStart = new Date(schedule.date_register_start);
                    }
                });
                if(flagIn) {
                    result.push({
                        id: camp.id,
                        // avatar: camp.avatar,
                        avatar: '/public/images/records/2.png',
                        url: '/camp/' + camp.url,
                        name: camp.name,
                        tags: camp.tags,
                        title: camp.title,
                        type: 'camp',
                        dateStart: dateStart
                    })
                }
            });
            programs.map((group) => {
                group.programs.map((program) => {
                    flagIn = false;
                    program.schedules.map((schedule) => {
                        let diffInDays = differenceInCalendarDays(new Date(schedule.date_register_end), currentDate);
                        if(diffInDays > 0) {
                            flagIn = true;
                            dateStart = new Date(schedule.date_register_start);
                        }
                    });
                    if(flagIn) {
                        result.push({
                            id: program.id,
                            // avatar: program.avatar,
                            avatar: '/public/images/records/2.png',
                            url: '/program/' + program.url,
                            name: program.name,
                            tags: program.tags,
                            title: program.title,
                            type: 'program',
                            dateStart: dateStart
                        })
                    }
                });
            });

            result.sort((a, b) => {
                if(a.dateStart < b.dateStart) {
                    return -1;
                }
                if(a.dateStart > b.dateStart) {
                    return 1;
                }
                return 0;
            });

            result.map((object) => {
                object.tags.map((tag) => {
                    tag.color = 'yellow-bright';
                })
            });

            return result;
        },
    }
};