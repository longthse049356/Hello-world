import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import Map from '../components/Map'
import MapBox from '../components/map/MapBox'

Vue.component('GMap', Map)
Vue.component('MapBox', MapBox)
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyD9sg_2YrJD8Bg9NqPPPWUlHhNhlHIZjfs',
        libraries: 'places', // This is required if you use the Autocomplete plugin
    },
    installComponents: true
})

Vue.mixin({
    data() {
        return {
            screenSize: 0
        }
    },
    methods: {
        toTop() {
            var myDiv = document.getElementById('bar-center');
            myDiv.scrollTop = 0;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        stickyFoot() {
            let myDiv = document.getElementById('bar-center');
            let elm = document.getElementById("hero-foot");
            let element = document.getElementById("banner");
            if (elm && element) {
                myDiv.onscroll = function () {
                    myFunction()
                };

                function myFunction() {
                    let offset = element.getBoundingClientRect().top
                    if (offset < (-element.clientHeight)) {
                        elm.classList.add("sticky")
                        elm.style.width = `${element.clientWidth}px`
                    } else {
                        elm.classList.remove("sticky")
                        elm.style.width = null;
                    }
                }
            }
        },
        formatData(data) {
            let out = {}
            Object.keys(data).forEach(
                field => {
                    if (data[field] && typeof data[field] === 'object' && data[field].id) {
                        out[field] = data[field].id
                    } else if (Array.isArray(data[field]) && data[field].length && typeof data[field][0] === 'object' && data[field][0].id) {
                        out[field] = data[field].map(x => x.id)
                    } else {
                        if (['target_content_type', 'target_object'].includes(field)) {
                            if (data[field] !== "0") {
                                out[field] = data[field]
                            }
                        } else {
                            out[field] = data[field]
                        }
                    }
                }
            )
            return out
        }
    },
    mounted() {
        this.screenSize = document.body.clientWidth
        window.addEventListener("resize", () => {
            this.screenSize = document.body.clientWidth
        });
    }
})
