<script lang="ts" >
import logo from '../assets/QueryFlow-icon.png'
import { Link, navigate } from 'svelte-routing';
import {isAuthenticated} from '../store'

const logout = async () => {
  localStorage.removeItem("token");
  const revoke = localStorage.getItem('revoke');
  if (revoke) {
    const revokeURL = `https://accounts.google.com/o/oauth2/revoke?token=${revoke}`;
    await fetch(revokeURL);
    localStorage.removeItem('revoke');
  }
  isAuthenticated.set(false);
  navigate('/', { replace: true });
}


</script>

<div class="navbar bg-base-100 fixed top-0 z-10">
  <div class="flex-1">
    <Link class="btn btn-ghost normal-case text-xl logo-text" to="/home">
      <img src={logo} alt="logo" width="26px" />
      QueryFlow
    </Link>
  </div>
  <div class="flex-none">
    <a class="navtags" href="$">About</a>
    <a class="navtags" href="$">SQL Tips</a>
    <a class="navtags" href="https://github.com/oslabs-beta/QueryFlow" target="_blank">GitHub</a>
  
    {#if $isAuthenticated}
    <button on:click={logout} class="btn btn-active btn-primary">Logout</button>
    {/if}
    
    <!-- 3-dot button in top-right corner, replace all navtags with this on smaller screens -->
    <!-- <button class="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
        </path>
      </svg>
    </button> -->
  </div>
</div>

<style>
  .navbar {
    border-bottom: 1px solid #cecece;
  }

  .navtags {
    margin-right: 25px;
  }
</style>