<template>
    <div class="trip-detail wrapper-test" v-if="trip">
        <div class="section is-small hero has-background-white">
            <div class="hero-body">
                <div class="container medium">
                    <div class="media is-mobile v-center">
                        <div class="media-left">
                            <div class="calendar">
                                <div class="month">Tháng {{momentDate.month() + 1}}</div>
                                <div class="body">
                                    <div class="title">{{momentDate.date()}}</div>
                                    <div>{{momentDate.year()}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="media-content">
                            <h1 style="margin-top: 0" class="title is-3">
                                <editable v-model="trip.title" :is-updating="creating"></editable>
                            </h1>
                            <b v-if="trip.start_point">
                                <n-link :to="`/${trip.start_point.slug}`">{{trip.start_point.title}}</n-link>
                            </b>
                            <span> - </span>
                            <b v-if="trip.end_point">
                                <n-link :to="`/${trip.end_point.slug}`">{{trip.end_point.title}}</n-link>
                            </b>
                            <b-field grouped v-if="creating">
                                <b-field expanded>
                                    <b-datepicker placeholder="Chọn thời gian..."
                                                  v-model="dateRanges" range icon-pack="fa">
                                    </b-datepicker>
                                </b-field>
                                <b-field>
                                    <b-input type="number" icon-pack="fab" icon="bitcoin"
                                             v-model="trip.fixed_cost" min="100000"></b-input>
                                </b-field>
                            </b-field>
                            <div v-else class="buttons" style="margin-bottom: 0rem">
                                <div class="button is-text">
                                    <b-icon size="is-small" pack="fa" icon="calendar"></b-icon>
                                    <span>{{dateRange.length}} ngày {{dateRange.length ? dateRange.length - 1 : 0 }} đêm</span>
                                </div>
                                <div class="button is-text">
                                    <b-icon size="is-small" pack="fa" icon="list"></b-icon>
                                    <span>{{destinations.length}} Điểm đến</span>
                                </div>
                                <div class="button is-text">
                                    <b-icon size="is-small" pack="fab" icon="bitcoin"></b-icon>
                                    <span>{{estimate_price.toLocaleString()}} VND</span>
                                </div>
                            </div>
                            <p>
                                <editable type="textarea" v-model="trip.description"
                                          :is-updating="creating"></editable>
                            </p>
                        </div>
                        <div class="media-right" v-if="!creating">
                            <Action v-if="trip.group" :group="trip.group"></Action>
                        </div>
                    </div>
                    <m-browser v-if="creating" :value="trip.photos" @input="trip.photos = $event" :max="6"/>
                </div>
            </div>
        </div>
        <div class="section is-small is-light">
            <div class="container medium">
                <div class="card">
                    <div class="card-content">
                        <div v-if="!creating" class="columns">
                            <div class="column is-8">
                                <h4 class="title is-6" style="margin-bottom: 0.30rem">Điểm đến</h4>
                                <b-carousel-list icon-pack="fa" icon-next="angle-right" icon-prev="angle-left"
                                                 :data="destinations" :items-to-show="2">
                                    <template slot="item" slot-scope="props">
                                        <div class="card is-border has-shadow">
                                            <div class="card-image">
                                                <m-thumbnail
                                                        ratio="is-2by1"
                                                        :value="props.list.photos && props.list.photos.length ? props.list.photos : []"
                                                        width="400" height="200"/>
                                            </div>
                                            <div class="card-content inside">
                                                <h4 style="margin-bottom: 0">
                                                    <n-link :to="`/${props.list.slug}`">{{props.list.title}}
                                                    </n-link>
                                                </h4>
                                            </div>
                                        </div>
                                    </template>
                                </b-carousel-list>
                            </div>
                            <div class="column">
                                <h4 class="title is-6">Phương tiện</h4>
                                <div class="columns is-variable is-1 is-multiline is-mobile">
                                    <div class="column is-3" v-for="v in vehicles" :key="v.id">
                                        <div class="button is-rounded is-light is-large">
                                            <b-icon pack="fa" :icon="v.icon" size="is-small"></b-icon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="!creating" class="columns is-mobile">
                            <div class="column">
                                <div v-if="trip.user" class="media v-center">
                                    <div class="media-left">
                                        <Avatar :is-rounded="true" class="is-32x32"
                                                :value="trip.user.profile ? trip.user.profile.media : trip.user.avatar"></Avatar>
                                    </div>
                                    <div class="media-content">
                                        <div><small>Tạo bởi</small></div>
                                        <b>
                                            <n-link :to="`/member/${trip.user.username}`">{{getFullName(trip.user)}}
                                            </n-link>
                                        </b>
                                        <div><small>3 chuyến đi</small></div>
                                    </div>
                                </div>
                                <div v-else class="media v-center">
                                    <div class="media-left">
                                        <m-thumbnail img-class="is-rounded" ratio="is-48x48"
                                                     :value="[$store.state.auth.user.avatar]"/>
                                    </div>
                                    <div class="media-content">
                                        <small>Tạo bởi</small>
                                        <b>{{getFullName($store.state.auth.user)}}</b>
                                        <div><small>3 chuyến đi</small></div>
                                    </div>
                                </div>
                            </div>
                            <div class="column" v-if="trip.group">
                                <QuickMember :group="trip.group"></QuickMember>
                            </div>
                        </div>
                        <div v-if="currentUser" class="button abs" @click="handleSubmit">
                            <b-icon pack="fa" :icon="creating ? 'check' : 'cogs'" size="is-small"></b-icon>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="card">
                            <div class="card-content">
                                <div class="level">
                                    <div class="level-left">
                                        <h2 class="title is-4">Lịch trình</h2>
                                    </div>
                                    <div class="level-right" v-if="creating">
                                        <div class="button" @click="onSelectStep({})">
                                            <b-icon pack="fa" icon="plus"></b-icon>
                                            <span>Thêm lịch trình</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="timeline" v-for="(j, i) in dateRange" :key="i">
                                    <div class="level line">
                                        <div class="level-left">
                                            <div><b>Ngày {{i + 1}}</b> ({{formatDate(j)}})</div>
                                        </div>
                                        <div class="level-right">
                                            <div class="buttons">
                                                <div class="button">
                                                    <span>Thời gian</span>
                                                </div>
                                                <div class="button">
                                                    <span>Bản đồ</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="steps"
                                         v-bind:class="{'updating': isDragging, 'dragging': isDragging}">
                                        <Step v-for="k in dateSteps(j)" :key="k.id" :value="k"
                                              @dragging="isDragging = $event"
                                              @input="k = $event"
                                              @select="onSelectStep($event)"
                                              :creating="creating"
                                        />
                                        <div class="slider" v-if="creating && isDragging">
                                            <b-tooltip class="one" label="00:00" always position="is-left">
                                                <b-icon pack="fa" icon="dot"></b-icon>
                                            </b-tooltip>
                                            <b-tooltip class="two" label="12:00" always position="is-left">
                                                <b-icon pack="fa" icon="dot"></b-icon>
                                            </b-tooltip>
                                            <b-tooltip class="three" label="23:45" always position="is-left">
                                                <b-icon pack="fa" icon="dot"></b-icon>
                                            </b-tooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!creating" class="column timeline-column-right">
                        <div class="card">
                            <div class="card-content">
                                <GroupInvite style="margin-bottom: 1rem;"></GroupInvite>
                                <div class="button is-fullwidth is-text">Yêu cầu tham gia (10)</div>
                            </div>
                        </div>
                        <Notification space="trip" content-type="trip" :object-id="trip.id" :is-activity="true"
                                      :is-notify="false" title="Hoạt động">
                            <n-link v-if="trip.group"
                                    :to="`/group/${trip.group.slug ? trip.group.slug : trip.group.id}`"
                                    class="button is-fullwidth">Bàn luận
                            </n-link>
                        </Notification>
                    </div>
                </div>
            </div>
        </div>
        <b-modal :active.sync="isActive" :can-cancel="false" :width="450" class="show-over">
            <div class="card">
                <div class="card-content">
                    <h4 class="title is-5">Mô tả chuyến đi này</h4>
                    <b-field label="Điểm đi">
                        <d-search icon="map-marker-alt" module="destination_destinations" v-model="trip.start_point"
                                  :multiple="false" placeholder="Chuyến đi sẽ bắt đầu tại đây"/>
                    </b-field>
                    <b-field label="Điểm đến">
                        <d-search icon="map-marker" size="is-large" module="destination_destinations"
                                  v-model="trip.end_point" :multiple="false" placeholder="Điểm đến"/>
                    </b-field>
                    <b-field label="Thời gian dự kiến">
                        <b-datepicker placeholder="Chọn thời gian..." v-model="dateRanges" range icon-pack="fa">
                        </b-datepicker>
                    </b-field>
                    <b-field grouped>
                        <b-field label="Số người" expanded>
                            <b-input type="number" icon-pack="fa" icon="users" v-model="trip.total_member"
                                     min="1"></b-input>
                        </b-field>
                        <b-field label="Chi phí ước tính" expanded>
                            <b-input type="number" icon-pack="fab" icon="bitcoin" v-model="trip.fixed_cost"
                                     min="100000"></b-input>
                        </b-field>
                    </b-field>
                    <b-field>
                        <div class="columns">
                            <div class="column">
                                <n-link class="button is-fullwidth" to="/trip/explore">Hủy</n-link>
                            </div>
                            <div class="column is-8">
                                <div class="button is-primary is-fullwidth" @click="isActive = false">Hoàn thành</div>
                            </div>
                        </div>
                    </b-field>
                </div>
            </div>
        </b-modal>
        <b-modal :active.sync="isActiveStep" :can-cancel="true" :width="450" class="show-over">
            <div class="card">
                <div class="card-content">
                    <StepForm v-if="creating"
                              @close="fetch"
                              :date-ranges="dateRanges"
                              v-model="stepForm"
                              :trip="trip"/>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import StepForm from "../../components/trip/StepForm";
    import Step from "../../components/trip/Step";
    import QuickMember from "../../components/group/QuickMember";
    import Action from "../../components/group/Action";

    export default {
        name: "Page_Trip_Detail",
        components: {StepForm, Step, QuickMember, Action},
        head() {
            return {
                title: this.trip.title ? this.trip.title : 'Tạo Trip'
            }
        },
        async asyncData(ctx) {
            let trip = null;
            if (ctx.params.id && ctx.params.id !== 'explore' && ctx.params.id !== 'create') {
                trip = await ctx.$graph['trip_trip_slug']({slug: ctx.params.id});
            }
            return {
                trip: trip ? ctx.store._vm.convertTZDate(trip['data']['trip_trip_slug']) : {},
                creating: ctx.params.id === 'create',
                isActive: ctx.params.id === 'create'
            }
        },
        data() {
            return {
                dateRanges: [],
                isDragging: false,
                stepForm: {},
                isActiveStep: false
            }
        },
        watch: {
            dateRanges() {
                if (this.dateRanges.length) {
                    this.trip.start_date = this.dateRanges[0];
                    this.trip.end_date = this.dateRanges[1]
                }
            }
        },
        computed: {
            estimate_price() {
                if (this.trip.fixed_cost) {
                    return this.trip.fixed_cost
                } else {
                    let prices = this.trip.steps ? this.trip.steps.map(x => x.estimate_price) : [];
                    return prices.reduce((a, b) => a + b, 0)
                }
            },
            dateRange() {
                if (this.trip.start_date && this.trip.end_date) {
                    return this.getDates(this.trip.start_date, this.trip.end_date)
                }
                return []
            },
            destinations() {
                let destinations = this.trip.steps ? this.trip.steps.map(x => {
                    if (x.point && x.point.destination) {
                        return x.point.destination
                    }
                }) : [];
                if (this.trip.end_point) {
                    destinations.push(this.trip.end_point)
                }
                return this.uniqEs6(destinations)
            },
            vehicles() {
                let vehicles = this.trip.steps ? this.trip.steps.map(x => {
                    if (x.vehicle) {
                        return x.vehicle
                    }
                }) : [];
                return this.uniqEs6(vehicles)
            },
            momentDate() {
                return this.momentTime(this.trip.start_date)
            },
        },
        methods: {
            async fetch() {
                this.isActiveStep = false
                let trip_slug = this.$route.params.id
                if (trip_slug && !['explore', 'create'].includes(trip_slug)) {
                    let res = await this.$graph['trip_trip_slug']({slug: trip_slug});
                    await this.$store.dispatch('menu/setD', res['data']['trip_trip_slug'].end_point)
                    this.trip = this.convertTZDate(res['data']['trip_trip_slug'])
                    this.creating = false
                    this.isActive = false
                }
            },
            dateSteps(date) {
                let out = this.trip.steps ? this.trip.steps.filter(item => {
                    return this.sameDay(date, item.start_date)
                }) : [];
                return out.sort(function (a, b) {
                    return a.start_date - b.start_date;
                })
            },
            onSelectStep(s) {
                this.stepForm = s;
                this.isActiveStep = true
            },
            async handleSubmit() {
                if (!this.creating) {
                    this.creating = true;
                    return
                }
                this.trip.start_date = this.dateRanges[0];
                this.trip.end_date = this.dateRanges[1];
                if (this.trip.id) {
                    await this.$rest.put(`/trip/trips/${this.trip.id}/`, this.cleanData(this.trip));
                    this.creating = false
                } else {
                    await this.$rest.post('/trip/trips/', this.cleanData(this.trip)).then(res => {
                        this.$router.replace({path: `/trip/${res.data.slug}`})
                    })
                }
            }
        },
        mounted() {
            this.toTop();
            if (this.trip.start_date && this.trip.end_date) {
                this.dateRanges = [this.trip.start_date, this.trip.end_date]
            }
        },
    }
</script>

<style lang="scss">
    .calendar {
        border: 1px solid #EEE;

        .month {
            padding: 5px 10px;
            background: red;
            color: #FFFFFF;
        }

        .body {
            padding: 10px;
            text-align: center;

            .title {
                margin-bottom: 0;
                font-size: 3.5rem;
            }
        }
    }

    .buttons {
        .input {
            padding-top: 0;
            margin-top: -0.25em;
        }

        .control.has-icons-right .icon.is-right,
        .control.has-icons-left .icon.is-left {
            top: -0.25em;
        }
    }

    .button.abs {
        position: absolute;
        top: 0;
        right: 0;
        border: 0;

        &:before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 50px 50px 0;
            border-color: transparent #f5f5f5 transparent transparent;
        }

        .icon {
            z-index: 1;
        }
    }

    .trip-detail {
        .card-image {
            position: relative;

            .level {
                position: absolute;
                bottom: 1rem;
                left: 1rem;
                right: 1rem;
                color: #FFFFFF;
            }
        }
    }

    .timeline {
        .steps {
            position: relative;

            &.updating {
                min-height: 600px;
                padding: 0 0 0 1rem;
            }

            &.dragging {
                &:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    backdrop-filter: blur(3px);
                    z-index: 888;
                }
            }
        }

        .slider {
            position: absolute;
            top: 0;
            left: -0.75rem;
            bottom: 0;
            width: 0.25em;
            background: whitesmoke;

            .one, .two, .three {
                position: absolute;
            }

            .one {
                top: -0.75rem;
            }

            .two {
                top: calc(50% - 0.75rem);
            }

            .three {
                bottom: -0.75rem;
            }
        }
    }

    .card {
        border: 1px solid #e6eaf1;
        box-shadow: 0 5px 5px rgba(0, 0, 0, .03);

        .level.line {
            background: #eef2f8;

            .button {
                background: #eef2f8
            }
        }
    }
</style>
