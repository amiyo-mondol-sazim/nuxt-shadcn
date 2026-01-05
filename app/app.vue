<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";
</script>

<template>
    <div>
        <NuxtLayout>
            <NuxtRouteAnnouncer />
            <NuxtPage />
            <Toaster :rich-colors="true" />
        </NuxtLayout>
    </div>
</template>
