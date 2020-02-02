import Vue from 'vue'

import AList from './activity/List'
import ACard from './activity/Card'
import Notification from './activity/Notification'
import ChatMinimize from './chat/Minimize'
import DList from './destination/List'
import DCard from './destination/Card'
import DGallery from './destination/Gallery'
import SList from './service/List'
import SCard from './service/Card'
import GList from './group/List'
import GCard from './group/Card'
import TList from './trip/List'
import TCard from './trip/Card'
import PList from './point/List'
import PCard from './point/Card'
import UList from './user/List'
import UCard from './user/Card'
import Popular from './Popular'
import Favorite from './action/Favorite'
import Follow from './action/Follow'
import Rating from './action/Rating'
import Voting from './action/Voting'
import Timeline from './trip/Timeline'
import APost from './activity/Form'
import DSearch from './generic/DataSearch'
import RSearch from './generic/RestSearch'
import Discovery from './destination/Discovery'
import MediaBrowser from './media/Browser'
import Editable from './form/Editable'
import GoogleMap from './map/Google'
import Thumbnail from './media/Thumbnail'
import Display from "./media/Display";
import Upload from "./media/Upload";
import Avatar from "./user/Avatar";
import AddressMap from "./AddressMap";
import Slider from "./generic/Slider";
import GroupInvite from "./user/GroupInvite";

Vue.component('GroupInvite', GroupInvite)
Vue.component('Slider', Slider)
Vue.component('AddressMap', AddressMap)
Vue.component('upload', Upload)
Vue.component('m-thumbnail', Thumbnail)
Vue.component('GoogleMap', GoogleMap)
Vue.component('m-browser', MediaBrowser)
Vue.component('media', Display)
Vue.component('editable', Editable)

Vue.component('ChatMinimize', ChatMinimize)
Vue.component('Notification', Notification)
Vue.component('favorite', Favorite)
Vue.component('favorite', Favorite)
Vue.component('follow', Follow)
Vue.component('rating', Rating)
Vue.component('voting', Voting)
Vue.component('u-list', UList)
Vue.component('u-card', UCard)
Vue.component('a-list', AList)
Vue.component('a-post', APost)
Vue.component('a-card', ACard)
Vue.component('d-list', DList)
Vue.component('d-card', DCard)
Vue.component('d-gallery', DGallery)
Vue.component('g-list', GList)
Vue.component('g-card', GCard)
Vue.component('t-list', TList)
Vue.component('t-card', TCard)
Vue.component('p-list', PList)
Vue.component('s-card', SCard)
Vue.component('s-list', SList)
Vue.component('p-card', PCard)
Vue.component('popular', Popular)
Vue.component('timeline', Timeline)
Vue.component('d-search', DSearch)
Vue.component('r-search', RSearch)
Vue.component('Discovery', Discovery)
Vue.component('Avatar', Avatar)