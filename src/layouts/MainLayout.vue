<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-avatar>
          <i class="fa-solid fa-umbrella"></i>
        </q-avatar>
        <q-toolbar-title class="text-bold">
          Weather Application
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>
