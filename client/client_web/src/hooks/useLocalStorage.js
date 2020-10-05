import { useState, useEffect } from "react";

const PREFIX = "realtime-";

export default function useLocalStorage(key, initialValue) {
  const keyWithPrefix = PREFIX + key;
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(keyWithPrefix); //cek di localstorage ada atau tidak
    // console.log("local", typeof localValue);
    if (localValue !== null) {
      if (localValue === "undefined") {
        // console.log("do nothing");
      } else {
        // console.log(localValue, "local");
        return JSON.parse(localValue);
      }
    } //kalau ada dan tidak null maka dimasukkan kedalam variabel useState
    if (typeof initialValue === "function") {
      //jika ada initial value maka dilakukan pengecekan
      return initialValue(); //jika initial value merupakan fungsi, maka jalankan fungsinya
    } else {
      return initialValue; //jika initial value berupa variabel, maka masukkan variabel tersebut ke useState
    }
  });

  useEffect(() => {
    localStorage.setItem(keyWithPrefix, JSON.stringify(value));
  }, [value, keyWithPrefix]);

  return [value, setValue];
}
