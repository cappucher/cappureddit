<script lang="ts">
  import { onMount } from "svelte";
  // import { setClient } from "svelte-apollo";
  // import { mutation } from "svelte-apollo";
  import { LoginUserDoc, RegisterUserDoc } from "../generated/generated";
  import Navbar from "./components/navbar.svelte";
  // import type { FetchResult } from "@apollo/client";

  // const registerUser = mutation(RegisterUserDoc);
  // const loginUser = mutation(LoginUserDoc);

  let userData: any;

//   onMount(async () => {
//     console.log("onMount");
//     try {
//       userData = await getUserData();
//       console.log("userData", userData);
//     } catch (error) {
//       console.log(error);
//     }
//   });

  // let data: FetchResult<any>;

  // async function getUserData() {
  //   console.log("getUserData");
  //   const user = await loginUser({
  //     variables: {
  //       username: "Johnny",
  //       password: "asdf",
  //     },
  //   });
  //   console.log("user", user);
  //   data = user;
  //   return user;
  // }
</script>

<svelte:head>
  <title>Home - Cappureddit</title>
</svelte:head>

<main>
  <Navbar />
  <!-- <pre>{JSON.stringify(data)}</pre>
  <button on:click={getUserData}>
    button
  </button> -->
</main>
