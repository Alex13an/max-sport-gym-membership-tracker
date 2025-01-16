import { useNow, watchThrottled } from "@vueuse/core";
import moment, { Moment } from "moment";
import { ref, provide } from "vue";
import { dateNowInjectionKey } from "./types";

export function useGlobalTime() {
  const now = useNow();
  const dateNow = ref<Moment>(moment());

  watchThrottled(
    now,
    () => {
      dateNow.value = moment(now.value);
    },
    {
      throttle: 100,
    }
  );

  provide(dateNowInjectionKey, dateNow);

  return {
    dateNow,
  };
}
