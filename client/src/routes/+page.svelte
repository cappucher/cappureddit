<script lang="ts">
  import { onMount } from "svelte";
  import { setClient } from "svelte-apollo";
  import { client } from "../apolloClient";
  import { mutation } from "svelte-apollo";
  import { LoginUserDoc, RegisterUserDoc } from "../generated/generated";
  import Navbar from "./components/navbar.svelte";

  setClient(client);

  const registerUser = mutation(RegisterUserDoc);
  const loginUser = mutation(LoginUserDoc);

  let userData: any;

  onMount(async () => {
    console.log("onMount");
    try {
      userData = await getUserData();
      console.log("userData", userData);
    } catch (error) {
      console.log(error);
    }
  });

  async function getUserData() {
    console.log("getUserData");
    const user = await loginUser({
      variables: {
        username: "Johnny",
        password: "asdf",
      },
    });
    console.log("user", user);
    return user;
  }
</script>

<main>
  <Navbar />
  {#await userData}
    <p>...waiting</p>
  {:then data}
    <pre>{JSON.stringify(data)}</pre>
  {:catch error}
    there was an error: {error}
  {/await}
</main>
