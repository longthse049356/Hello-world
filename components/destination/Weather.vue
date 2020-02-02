<template>
    <div class="card no-border card-weather">
        <div class="weather-today">
            <div class="wt-background" style="background-image: url('https://i.picsum.photos/id/1040/800/400.jpg')"></div>
            <div class="wt-content">
                <div class="columns">
                    <div class="column is-6">
                        <div class="title is-6 mb-05">Thời tiết</div>
                        <div class="title is-2 mb-05">TP Đà Lạt</div>
                        <div class="title is-6 mb-0">Thứ 6, ngày 10/01/2020</div>
                    </div>
                    <div class="column weather-icon-col">
                        <div class="weather-icon is-large">
                            <img src="../../static/weather/01.svg" title="">
                        </div>
                    </div>
                    <div class="column has-text-right temp">
                        <div class="columns">
                            <div class="column">
                                <div class="title is-6 mb-05">&nbsp;</div>
                                <div class="title is-2 mb-05">25°C</div>
                                <div class="title is-7 mb-0">Nắng nhẹ</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-content" style="padding: 1.5rem">
            <div class="columns weather-list">
                <div class="column weather-item has-text-centered">
                    <div class="wi-block">
                        <div class="title is-5 mb-05">Thứ 7</div>
                        <div class="title is-7 mb-05">11/01</div>
                    </div>
                    <div class="wi-block">
                        <div class="weather-icon is-medium bottom-1">
                            <img src="../../static/weather/04.svg" title="">
                        </div>
                    </div>
                    <div class="wi-block">
                        <div class="title is-7 is-normal mb-05">Nhiều mây</div>
                        <div class="title is-6">25°C  /  23°C</div>
                    </div>
                </div>
                <div class="column weather-item has-text-centered">
                    <div class="wi-block">
                        <div class="title is-5 mb-05">CN</div>
                        <div class="title is-7 mb-05">12/01</div>
                    </div>
                    <div class="wi-block">
                        <div class="weather-icon is-medium bottom-1">
                            <img src="../../static/weather/02.svg" title="">
                        </div>
                    </div>
                    <div class="wi-block">
                        <div class="title is-7 is-normal mb-05">Mưa dông</div>
                        <div class="title is-6">25°C  /  23°C</div>
                    </div>
                </div>
                <div class="column weather-item has-text-centered">
                    <div class="wi-block">
                        <div class="title is-5 mb-05">Thứ 2</div>
                        <div class="title is-7 mb-05">13/01</div>
                    </div>
                    <div class="wi-block">
                        <div class="weather-icon is-medium bottom-1">
                            <img src="../../static/weather/03.svg" title="">
                        </div>
                    </div>
                    <div class="wi-block">
                        <div class="title is-7 is-normal mb-05">Nắng gắt</div>
                        <div class="title is-6">25°C  /  23°C</div>
                    </div>
                </div>
                <div class="column weather-item has-text-centered">
                    <div class="wi-block">
                        <div class="title is-5 mb-05">Thứ 3</div>
                        <div class="title is-7 mb-05">14/01</div>
                    </div>
                    <div class="wi-block">
                        <div class="weather-icon is-medium bottom-1">
                            <img src="../../static/weather/05.svg" title="">
                        </div>
                    </div>
                    <div class="wi-block">
                        <div class="title is-7 is-normal mb-05">Mưa rải rác</div>
                        <div class="title is-6">25°C  /  23°C</div>
                    </div>
                </div>
                <div class="column weather-item has-text-centered">
                    <div class="wi-block">
                        <div class="title is-5 mb-05">Thứ 4</div>
                        <div class="title is-7 mb-05">15/01</div>
                    </div>
                    <div class="wi-block">
                        <div class="weather-icon is-medium bottom-1">
                            <img src="../../static/weather/06.svg" title="">
                        </div>
                    </div>
                    <div class="wi-block">
                        <div class="title is-7 is-normal mb-05">Hửng nắng</div>
                        <div class="title is-6">25°C  /  23°C</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Weather"
    }
</script>

<style scoped>

</style>