<template>
  <q-page class="page-wrap q-py-xl q-px-md">
    <div v-if="haveData">
      <div class="row justify-center">
        <div class="col-8 main-wrap">
          <div class="row justify-center">
            <div class="col-4 col-md-2">
              <q-btn
                class="bg-primary q-pa-md q-px-lg location-button"
                @click="fetchDataByLocation"
              >
                <i class="fa-solid fa-location-crosshairs text-secondary"></i>
              </q-btn>
            </div>
            <div class="col-8 col-md-10">
              <q-input
                filled
                bg-color="primary"
                clearable
                color="accent"
                :input-style="{ color: '#f6f6f8' }"
                v-model="cityName"
                placeholder="Search for cities"
                @keyup.enter="searchWeather"
              >
                <template v-slot:append>
                  <q-btn flat @click="searchWeather">
                    <i class="fa-solid fa-magnifying-glass text-secondary"></i>
                  </q-btn>
                </template>
              </q-input>
            </div>
          </div>
        </div>
      </div>

      <div class="q-mt-lg row justify-center">
        <div class="col-8">
          <h4 class="text-h4 text-secondary text-bold">Today</h4>
          <TodayData />
        </div>
      </div>
      <div class="q-mt-lg row justify-center">
        <div class="col-8">
          <h4 class="text-h4 text-secondary text-bold">Next Days</h4>
          <NextDays />
        </div>
      </div>
      <div class="q-mt-lg row justify-center">
        <div class="col-8">
          <FooterBar />
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useWeatherStore } from './../stores/WeatherStore.ts';
import TodayData from 'components/TodayData.vue';
import NextDays from 'components/NextDays.vue';
import FooterBar from 'components/FooterBar.vue';

const { fetchWeather, fetchDataByLocation, haveData } = useWeatherStore();

const cityName = ref('');

const searchWeather = () => {
  fetchWeather(cityName.value);
};

onMounted(() => {
  fetchWeather('Nicosia');
});
</script>

<style lang="scss" scoped>
.page-wrap {
  background-color: $dark;
  .location-button {
    font-size: 1.4rem;
  }
}
</style>
