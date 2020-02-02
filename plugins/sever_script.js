import Vue from 'vue'
import moment from "moment";

const _ = require("lodash")
const MEDIA_ENDPOINT = 'https://trip.sgp1.digitaloceanspaces.com'
const VERB = {
    COMMENTED: "COMMENTED",
    FOLLOWED: "FOLLOWED",
    CREATED: "CREATED",
    UPDATE: "UPDATE",
    JOINED: "JOINED",
    REQUEST: "JOINED",
    INVITE: "INVITE",
    BAN: "BAN",
    CONTRIBUTED: "CONTRIBUTED",
    VOTED: "VOTED",
    SEND: "SEND",
    POSTED: "POSTED"
}

const MODEL = {
    DESTINATION: "destination",
    TRIP: "trip",
    MESSAGE: "message",
    STEP: "step",
    USER: "user",
    POINT: "point",
    GROUP: "group",
    ACTION: "action",
    POST: "post",
    COMMENT: "comment"
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
Vue.mixin({
    methods: {
        timeSince(date) {
            let seconds = moment().diff(date, 'seconds', false);
            return this.convertTime(seconds)
        },
        convertTime(seconds) {
            var interval = Math.floor(seconds / 31536000);
            if (interval > 1) {
                return interval + " năm";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                return interval + " tháng";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " ngày";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return interval + " giờ";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + " phút";
            }
            return Math.floor(seconds) + " giây";
        },
        capitalizeFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        convertName(user, flag) {
            if (flag && user[flag]) {
                return user[flag]
            }
            if (user['first_name'] || user['last_name']) {
                return user['first_name'] + ' ' + user['last_name']
            }
            return user['username']
        },
        formatDate(date) {
            return new moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')
        },
        formatTime(date) {
            return date ? new moment(date, 'YYYY-MM-DDTHH:mm').format('HH:mm') : null
        },
        momentTime(date) {
            return moment.utc(date, 'YYYY-MM-DDTHH:mm')
        },
        getThumbnail(size, path) {
            return `${MEDIA_ENDPOINT}/${size}${path.replace(MEDIA_ENDPOINT, '').split('?')[0]}`
        },
        getFullName(user) {
            return user.first_name || user.last_name ? `${user.first_name} ${user.last_name}` : user.username
        },
        uniqEs6(arrArg) {
            return arrArg.filter((elem, pos, arr) => {
                return elem && arr.map(x => {
                    if (x) {
                        return x.id
                    }
                }).indexOf(elem.id) === pos;
            });
        },
        getDates(startDate, stopDate) {
            if (startDate && stopDate) {
                let dateArray = [];
                let currentDate = startDate;
                while (currentDate <= stopDate) {
                    dateArray.push(currentDate);
                    currentDate = currentDate.addDays(1);
                }
                return dateArray;
            }
            return []
        },
        cleanData(data) {
            let out = {}
            Object.keys(data).forEach(i => {
                if (data[i]) {
                    if (['start_date', 'end_date'].includes(i)) {
                        out[i] = this.momentTime(data[i]).format('YYYY-MM-DD HH:mm')
                    } else if (Array.isArray(data[i])) {
                        out[i] = data[i].map(x => x.id)
                    } else if (typeof data[i] === 'object' && data[i].id) {
                        out[i] = data[i].id
                    } else {
                        out[i] = data[i]
                    }
                }
            })

            return out
        },
        developmentNotify() {
            this.$buefy.snackbar.open({
                duration: 5000,
                message: 'Tính năng đang trong quá trình phát triển, vui lòng đăng ký! Chung tôi sẽ gửi bản cập nhập sớm nhất tới bạn.',
                type: 'is-danger',
                position: 'is-bottom-left',
                actionText: 'Undo',
                queue: false,
                onAction: () => {
                }
            })
        },
        sameDay(d1, d2) {
            return d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth() &&
                d1.getDate() === d2.getDate();
        },
        convertDate(date) {
            if (date) {
                return new Date(date)
            }
            return null
        },
        convertTZDate(trip) {
            trip.start_date = this.convertDate(trip.start_date)
            trip.end_date = this.convertDate(trip.end_date)
            if (trip.steps && trip.steps.length) {
                for (let i = 0; i < trip.steps.length; i++) {
                    trip.steps[i].start_date = this.convertDate(trip.steps[i].start_date)
                    trip.steps[i].end_date = this.convertDate(trip.steps[i].end_date)
                }
            }
            return trip
        },
        getIMGSize(instance, size) {
            return instance['thumbnails'][`thumb_${size}`]
        },
        isGroupManager(group) {
            if (this.$store.state.auth.user) {
                return group['is_join'] && group['is_join'].role && group['is_join'].role.title === 'MANAGER'
            }
            return false
        },
        activity2String(activity, flag) {
            let a = null
            let b = null
            let c = null
            switch (activity.verb) {
                case VERB.BAN:
                    a = "đã khóa"
                    break
                case VERB.COMMENTED:
                    a = "đã trả lời"
                    break
                case VERB.CONTRIBUTED:
                    a = "đã đóng góp"
                    break
                case VERB.CREATED:
                    a = "đã tạo"
                    break
                case VERB.FOLLOWED:
                    a = "đã theo dõi"
                    break
                case VERB.INVITE:
                    a = "đã mời"
                    break
                case VERB.JOINED:
                    a = "đã tham gia"
                    break
                case VERB.UPDATE:
                    a = "đã cập nhập"
                    break
                case VERB.REQUEST:
                    a = "đã yêu cầu"
                    break
                case VERB.VOTED:
                    a = "đã bình chọn"
                    break
                case VERB.SEND:
                    a = "đã gửi"
                    break
                case VERB.POSTED:
                    a = "đã đăng"
                    break
            }
            if (activity.action_object) {
                switch (activity.action_object.model_name) {
                    case MODEL.DESTINATION:
                        b = "điểm đến"
                        break
                    case MODEL.ACTION:
                        b = "hoạt động"
                        break
                    case MODEL.POST:
                        b = "bài viết"
                        break
                    case MODEL.COMMENT:
                        b = "bình luận"
                        break
                    case MODEL.MESSAGE:
                        b = "tin nhắn"
                        break
                    case MODEL.POINT:
                        b = "địa điểm"
                        break
                    case MODEL.STEP:
                        b = "hoạt động"
                        break
                    case MODEL.TRIP:
                        b = "chuyến đi"
                        break
                    case MODEL.USER:
                        b = "thành viên"
                        break
                    case MODEL.GROUP:
                        b = "nhóm"
                        break
                }
            }
            if (activity['target']) {
                switch (activity['target']['model_name']) {
                    case MODEL.DESTINATION:
                        c = "tới điểm đến"
                        break
                    case MODEL.ACTION:
                        c = "tới hoạt động"
                        break
                    case MODEL.COMMENT:
                        c = "tới bình luận"
                        break
                    case MODEL.MESSAGE:
                        c = "tin nhắn"
                        break
                    case MODEL.POINT:
                        c = "tới địa điểm"
                        break
                    case MODEL.STEP:
                        c = "tới bước"
                        break
                    case MODEL.TRIP:
                        c = "trong chuyến đi"
                        break
                    case MODEL.USER:
                        c = "tới thành viên"
                        break
                    case MODEL.GROUP:
                        c = "trong nhóm"
                        break
                }
            }
            return `${a} ${b ? b : ''}${c && flag ? ' ' + c: ''}`
        }
    },
    computed: {
        currentUser: {
            get() {
                let user = this.$store.state.auth.user
                if (user) {
                    user.profile = user.profiles ? user.profiles.filter(x => x.is_main).pop() : null
                }
                return user
            }
        }
    }
})
