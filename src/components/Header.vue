<template>
  <header
    class="h-16 sm:h-32 w-full bg-ab-grayLight flex justify-center items-center"
  >
    <Logo />
  </header>
</template>

<script>
import Logo from "../components/Logo.vue";

export default {
  name: "Header",
  components: {
    Logo,
  },
};
</script>
