// WeatherStore.ts
import { defineStore } from 'pinia';
import { api } from '../boot/axios';
import { Dialog } from 'quasar';
import { reactive } from 'vue';

export const useWeatherStore = defineStore({
    id: 'weather',
    state: () => ({
        weatherData: reactive({}),
        haveData: true,
    }),
    actions: {
        async fetchWeather(location: string) {
            this.haveData = false;

            try {
                const response = await api.get(`/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${location}&days=3`);
                Object.assign(this.weatherData, response.data);

                this.haveData = true;
            } catch (error) {
                Dialog.create({
                    title: 'Error',
                    message: 'An error occurred while fetching weather data.'
                });
                this.haveData = false;
            }
        },

        async fetchDataByLocation() {
            if (navigator.geolocation) {
                this.haveData = false;
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        try {
                            const latitude = position.coords.latitude;
                            const longitude = position.coords.longitude;
                            const response = await api.get(
                                `/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${latitude},${longitude}&days=3`
                            );
                            Object.assign(this.weatherData, response.data);

                            this.haveData = true;

                        } catch (error) {
                            Dialog.create({
                                title: 'Error',
                                message: 'An error occurred while fetching weather data by location.'
                            });
                        }
                    },
                    (error) => {
                        Dialog.create({
                            title: 'Error',
                            message: `Failed to get location: ${error.message}`
                        });
                    }
                );
            } else {
                Dialog.create({
                    title: 'Error',
                    message: 'Geolocation is not supported by this browser.'
                });
            }
        }
    },
});
