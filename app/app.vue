<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";

useHead({
    titleTemplate: (title) =>
        title
            ? `${title} | TodoMaster`
            : "TodoMaster - Manage your tasks with ease",
    htmlAttrs: {
        lang: "en",
    },
    link: [
        {
            rel: "icon",
            type: "image/x-icon",
            href: "/favicon.ico",
        },
    ],
});

useSeoMeta({
    description:
        "A modern, fast, and secure todo application built with Nuxt 3 and Shadcn Vue.",
    ogTitle: "TodoMaster",
    ogDescription:
        "A modern, fast, and secure todo application built with Nuxt 3 and Shadcn Vue.",
    ogImage: "/og-image.png",
    twitterCard: "summary_large_image",
});
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
